const { parseHL7Message } = require('./src/parser');
const hl7MessageGenerator = require('./src/generator');

module.exports = {
  parseHL7Message,
  hl7MessageGenerator,
};
