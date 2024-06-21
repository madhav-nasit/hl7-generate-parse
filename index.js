const { parseHL7Message } = require('./src/parser');
const { generateHL7Message } = require('./src/generator');

module.exports = {
  parseHL7Message,
  generateHL7Message,
};
