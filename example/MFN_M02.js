const { parseHL7Message, hl7MessageGenerator } = require('../index');

try {
  const hl7MFNMessage = `MSH|^~\\&|Ntierprise|Ntierprise Clinic|Healthmatics EHR|Healthmatics Clinic|20190423114643||MFN^M02|8915-51|P|2.3|||NE|NE
MFI|REF||UPD|||NE
MFE|MAD|||testy
STF|testy|testy|Aaron^RefTest^R|R|M|19871011|A|||(333)222-1111^^PH^RefTest@Allscripts.com^^333^2221111|Address1^^Raleigh^NC^27609
PRA|testy|||||984567UPIN^UPIN`;

  const parsedMessage = parseHL7Message(hl7MFNMessage);
  console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

  console.log('\n');

  const hl7Generator = new hl7MessageGenerator();

  // Option 1: Generate HL7 message with addSegment
  console.log('Option 1: Generate HL7 message with addSegment');
  hl7Generator.addSegment('MSH', parsedMessage['MSH']);
  hl7Generator.addSegment('MFI', parsedMessage['MFI']);
  hl7Generator.addSegment('MFE', parsedMessage['MFE']);
  hl7Generator.addSegment('STF', parsedMessage['STF']);
  hl7Generator.addSegment('PRA', parsedMessage['PRA']);

  const hl7Message1 = hl7Generator.generateHl7();
  console.log(`Generated MFN Message (Option 1): \n${hl7Message1}`);

  console.log('\n');

  // Option 2: Generate HL7 message with complete Json
  console.log('Option 2: Generate HL7 message with complete Json');
  const hl7Message2 = hl7Generator.generateHl7(parsedMessage);
  console.log(`Generated MFN Message (Option 2): \n${hl7Message2}`);
} catch (error) {
  console.error(`Generate Error:\n${error.message}`);
}
