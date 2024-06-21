const fs = require('fs');
const path = require('path');
const { formatSegment, validateHL7Message } = require('./helper');

// Function to generate HL7 message from schema and data
const generateHL7Message = (data) => {
  if (!data) {
    throw new Error(`Please provide hl7 json object.`);
  }

  const mshSegment = Array.isArray(data['MSH']) ? data['MSH'][0] : data['MSH'];
  const type = mshSegment.MessageType.MessageCode + '_' + mshSegment.MessageType.TriggerEvent?.replace(/ /g, '');
  const separator = mshSegment.FieldSeparator;
  const encChars = mshSegment.EncodingCharacters;

  const schemaPath = path.resolve(__dirname, 'messages', `${type}.json`);
  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Schema file not found for message type: ${type}`);
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  } catch (error) {
    throw new Error(`Failed to parse schema file: ${error.message}`);
  }

  const hl7Message = [];
  const schemaElements = schema[type].elements;
  if (!Array.isArray(schemaElements)) {
    throw new Error(`Schema elements for ${type} is not in array format`);
  }

  validateHL7Message(type, data);

  for (const [segment, content] of Object.entries(data)) {
    const formattedSegment = Array.isArray(content)
      ? content.map((item) => formatSegment(segment, item, separator, encChars))
      : [formatSegment(segment, content, separator, encChars)];

    hl7Message.push(...formattedSegment);
  }
  return hl7Message.join('\n');
};

module.exports = {
  generateHL7Message,
};
