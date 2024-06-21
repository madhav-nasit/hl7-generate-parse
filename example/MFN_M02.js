const { parseHL7Message, generateHL7Message } = require('../index');

const hl7MFNMessage = `MSH|^~\&|Ntierprise|Ntierprise Clinic|Healthmatics EHR|Healthmatics Clinic|20190423114643||MFN^M02|8915-51|P|2.3|||NE|NE
MFI|REF||UPD|||NE
MFE|MAD|||testy
STF|testy|testy|Aaron^RefTest^R|R|M|19871011|A|||(333)222-1111^^PH^RefTest@Allscripts.com^^333^2221111|Address1^^Raleigh^NC^27609
PRA|testy|||||984567UPIN^UPIN`;

const parsedMessage = parseHL7Message(hl7MFNMessage);
console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

console.log('\n');
try {
  const hl7Message = generateHL7Message(parsedMessage);
  console.log(`Generated MFN Message: \n${hl7Message}`);
} catch (error) {
  console.error(`Generate Error:\n${error.message}`);
}
