// helper.js

const fs = require('fs');
const path = require('path');

// Function to format individual fields
const formatField = (field, encChars, joinBy) => {
  if (field === null || field === undefined) {
    return '';
  } else if (Array.isArray(field)) {
    return field.map((item) => formatField(item, encChars, encChars[0]).replace(/(\^+)+$/, '')).join(encChars[1]);
  } else if (typeof field === 'object') {
    return Object.values(field)
      .map((item) => formatField(item, encChars, encChars[3]).replace(/(\&+)+$/, ''))
      .join(joinBy ? joinBy : encChars[0]);
  }
  return String(field);
};

// Function to format an HL7 segment
const formatSegment = (segmentName, segmentData, separator, encChars) => {
  try {
    if (!segmentData) {
      return '';
    }
    const segmentFields = [segmentName];
    if (segmentName === 'MSH') {
      delete segmentData.FieldSeparator; // Remove MSH-specific field
    }
    const fields = Object.values(segmentData).map((item) => formatField(item, encChars).replace(/(\^+)+$/, ''));
    segmentFields.push(...fields);
    return segmentFields.join(separator).replace(/\|+$/, '');
  } catch (error) {
    return '';
  }
};

const validateHL7Message = (type, data) => {
  const baseDir = './src/messages';
  const schemaPath = path.resolve(baseDir, `${type}.json`);

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Incorrect message type: ${type}`);
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  } catch (error) {
    throw new Error(`Failed to parse message type: ${error.message}`);
  }

  const schemaElements = schema[type].elements;
  if (!Array.isArray(schemaElements)) {
    throw new Error(`Schema elements for ${type} is not in array format`);
  }

  // List of provided segments
  const providedSegments = Object.keys(data);

  // Function to get nested group segments definition
  const getGroupSegmentDefinition = (groupName) => {
    return schema[groupName]?.elements || [];
  };

  // Check for missing required segments
  const missingSegments = schemaElements.reduce((acc, { minOccurs, segment, group }) => {
    const getMissingSegments = ({ minOccurs, segment, group }) => {
      if (minOccurs === '1') {
        if (group) {
          const nestedGroupElements = getGroupSegmentDefinition(group);
          nestedGroupElements.map(getMissingSegments);
        }

        if (segment && !providedSegments.includes(segment)) {
          acc.push(segment);
        }
      }
    };
    getMissingSegments({ minOccurs, segment, group });
    return acc;
  }, []);

  if (missingSegments.length > 0) {
    throw new Error(`Missing required segments for ${type}: ${missingSegments.join(', ')}`);
  }

  const findSegmentInGroup = (segment, group) => {
    const nestedGroupElements = getGroupSegmentDefinition(group);

    for (const nestedElem of nestedGroupElements) {
      if (nestedElem.segment === segment) {
        return true;
      }

      if (nestedElem.group && findSegmentInGroup(segment, nestedElem.group)) {
        return true;
      }
    }

    return false;
  };

  // Check for extra segments beyond allowed in schema
  const excessSegments = providedSegments.filter((seg) => {
    let isValid = false;

    for (const elem of schemaElements) {
      if (elem.segment === seg) {
        isValid = true;
        break;
      }

      if (elem.group && findSegmentInGroup(seg, elem.group)) {
        isValid = true;
        break;
      }
    }

    return !isValid;
  });

  if (excessSegments.length > 0) {
    throw new Error(`Extra segments found that are not allowed for ${type}: ${excessSegments.join(', ')}`);
  }

  const segmentOccurance = {};
  for (const [segment, content] of Object.entries(data)) {
    if (Array.isArray(content)) {
      segmentOccurance[segment] = content.length.toString();
    } else {
      segmentOccurance[segment] = '1';
    }
  }

  const getSegmentDefinition = (elem) => {
    let segments = [];
    if (elem.group) {
      const nestedGroupElements = getGroupSegmentDefinition(elem.group);
      nestedGroupElements.forEach((nestedElem) => {
        const nestedSegments = getSegmentDefinition(nestedElem);
        if (nestedSegments) {
          segments = segments.concat(nestedSegments);
        }
      });
    } else {
      return elem;
    }

    return segments;
  };

  const formattedSchema = formatSchemaData(schema, type);
  const occurrenceErrors = validateOccurrences(segmentOccurance, formattedSchema);

  if (occurrenceErrors.length > 0) {
    throw new Error(occurrenceErrors.join('\n'));
  }
};

const formatElements = (elements, data) => {
  return elements.map((element) => {
    if (element.group) {
      const groupKey = element.group;
      if (data[groupKey]) {
        return {
          ...element,
          segment: formatElements(data[groupKey].elements, data),
        };
      }
    }
    return element;
  });
};

const formatSchemaData = (data, type) => {
  let result = [];
  if (data.hasOwnProperty(type)) {
    result = formatElements(data[type].elements, data);
  }
  return result;
};

const validateOccurrences = (segmentOccurance, formattedSchema) => {
  const results = [];

  const getMaxOccurs = (fistOccr, secondOccr) => {
    if (fistOccr === 'unbounded' || secondOccr === 'unbounded') {
      return 'unbounded';
    } else if (parseInt(fistOccr) >= parseInt(secondOccr)) {
      return fistOccr;
    } else {
      return secondOccr;
    }
  };
  const findSegment = (segmentName, schema, parentMaxOccurs = null) => {
    for (const item of schema) {
      if (item.segment === segmentName) {
        return { ...item, parentMaxOccurs };
      } else if (item.group) {
        const result = findSegment(segmentName, item.segment, getMaxOccurs(parentMaxOccurs, item.maxOccurs));
        if (result) {
          return result;
        }
      }
    }
    return null;
  };

  for (const [segment, occurrence] of Object.entries(segmentOccurance)) {
    const dataSegment = findSegment(segment, formattedSchema);
    if (dataSegment) {
      const { minOccurs, maxOccurs, parentMaxOccurs } = dataSegment;
      const expectedMax = parentMaxOccurs ? parentMaxOccurs : maxOccurs;
      const isValidMin = minOccurs <= parseInt(occurrence);
      const isValidMax = parentMaxOccurs
        ? parentMaxOccurs === 'unbounded' || parseInt(parentMaxOccurs) >= parseInt(occurrence)
        : maxOccurs === 'unbounded' || parseInt(maxOccurs) >= parseInt(occurrence);

      if (!(isValidMin && isValidMax)) {
        let errorMsg = '';
        if (!isValidMin) {
          errorMsg += `expected min occurs ${minOccurs}, but got ${occurrence}.`;
        }
        if (!isValidMax) {
          errorMsg += `expected max occurs ${expectedMax}, but got ${occurrence}.`;
        }
        results.push(`Segment ${segment} ${errorMsg}`);
      }
    } else {
      results.push(`Segment ${segment} not found in formatted data`);
    }
  }

  return results;
};

module.exports = {
  formatField,
  formatSegment,
  validateHL7Message,
  formatSchemaData,
  validateOccurrences,
};
