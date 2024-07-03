const fs = require('fs');
const path = require('path');
const { formatSegment, validateHL7Message } = require('./helper');

/**
 * Class representing an HL7 message generator.
 */
class hl7MessageGenerator {
  /**
   * Create an HL7 message generator.
   */
  constructor() {
    this.data = {}; // Stores the HL7 message data
    this.schema = null; // Stores the HL7 message schema
    this.type = ''; // Stores the message type
    this.separator = '|'; // Field separator character
    this.encChars = '^~\\&'; // Encoding characters
  }

  /**
   * Add a segment to the HL7 message data.
   * @param {string} segment - The segment name.
   * @param {object} content - The segment content.
   */
  addSegment(segment, content) {
    if (!this.data[segment]) {
      this.data[segment] = [];
    }
    this.data[segment].push(content);
  }

  /**
   * Load the schema for the HL7 message.
   * @throws Will throw an error if the MSH segment is missing or the schema file cannot be found or parsed.
   */
  loadSchema() {
    // Retrieve the MSH segment to determine message type, separator, and encoding characters
    const mshSegment = Array.isArray(this.data['MSH']) ? this.data['MSH'][0] : this.data['MSH'];
    if (!mshSegment) {
      throw new Error(`MSH segment is missing.`);
    }

    // Determine message type and other properties from the MSH segment
    this.type = mshSegment.MessageType.MessageCode + '_' + mshSegment.MessageType.TriggerEvent?.replace(/ /g, '');
    this.separator = mshSegment.FieldSeparator || this.separator;
    this.encChars = mshSegment.EncodingCharacters || this.encChars;

    // Resolve the schema file path
    const schemaPath = path.resolve(__dirname, 'messages', `${this.type}.json`);
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Schema file not found for message type: ${this.type}`);
    }

    // Load and parse the schema file
    try {
      this.schema = JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
    } catch (error) {
      throw new Error(`Failed to parse schema file: ${error.message}`);
    }

    // Validate the HL7 message data against the schema
    validateHL7Message(this.type, this.data);
  }

  /**
   * Generate an HL7 message string from JSON data.
   * @param {object} [data] - Optional. Complete HL7 JSON object.
   * @returns {string} The generated HL7 message string.
   * @throws Will throw an error if the schema elements are not in array format.
   */
  generateHl7(data) {
    if (data) {
      this.data = data;
    }

    // Load the schema if it has not been loaded yet
    if (!this.schema) {
      this.loadSchema();
    }

    const hl7Message = [];

    // Retrieve schema elements for the message type
    const schemaElements = this.schema[this.type].elements;
    if (!Array.isArray(schemaElements)) {
      throw new Error(`Schema elements for ${this.type} is not in array format`);
    }

    // Format each segment and add it to the HL7 message
    for (const [segment, contents] of Object.entries(this.data)) {
      const formattedSegments = Array.isArray(contents)
        ? contents.map((item) => formatSegment(segment, item, this.separator, this.encChars))
        : [formatSegment(segment, contents, this.separator, this.encChars)];

      hl7Message.push(...formattedSegments);
    }

    // Join all formatted segments with newline characters to form the final HL7 message
    return hl7Message.join('\n');
  }
}

module.exports = hl7MessageGenerator;
