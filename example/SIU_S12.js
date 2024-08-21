const { parseHL7Message, hl7MessageGenerator } = require('../index');

try {
  const hl7SIUMessage = `MSH|^~\\&|Ntierprise|Ntierprise Clinic|Healthmatics EHR|Healthmatics Clinic|20190423114154||SIU^S12|8907-45|P|2.3|||NE|NE
SCH|1209|13030|||1209|OV15^OFFICE VISIT-15^CSI^N|OFFICE VISIT-15^OFFICE VISIT-15 -|OV15|15|m|^^15^20190423140000^20190423141500|||||mdrxmbyr^Byrne^Misty||||mdrxmbyr^Byrne^Misty|||||Scheduled^^CSI
PID|1||150||Bond^James^^007||19770920|M|||007 Soho Lane^^Cary^NC^27511||(919)007-0007^^^^^919^0070007~(777)707-0707^^CP^^^777^7070707~^NET^X.400^007@BritishSecretService.com|(919)851-6177 X007^^^^^919^8516177^007||M||150|007-00-0007|||||||||||N
PV1|1|R|||||MRYAN^Ryan^Mark^S^phd^^^^&MR1127&UPIN||WEEDER^Weeder, M.D.^Dana^N^^^^^&W22630&UPIN|||||||N||||M
RGS|1|A
AIG|1||PULLEN^Pullen, Jeri|P^^CSI
AIL|1||MainOffi^^^MainOffi^^^^^Healthmatics Clinic|^Healthmatics Clinic^CSI
AIP|1||JPULLEN1^Pullen^Jeri^^^^^^&F12456&UPIN|D^Pullen, Jeri||20190423140000|||15|m^Minutes`;

  const parsedMessage = parseHL7Message(hl7SIUMessage);
  console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

  console.log('\n');

  const hl7Generator = new hl7MessageGenerator();

  // Option 1: Generate HL7 message with addSegment
  console.log('Option 1: Generate HL7 message with addSegment');
  hl7Generator.addSegment('MSH', parsedMessage['MSH']);
  hl7Generator.addSegment('SCH', parsedMessage['SCH']);
  hl7Generator.addSegment('PID', parsedMessage['PID']);
  hl7Generator.addSegment('PV1', parsedMessage['PV1']);
  hl7Generator.addSegment('RGS', parsedMessage['RGS']);
  hl7Generator.addSegment('AIG', parsedMessage['AIG']);
  hl7Generator.addSegment('AIL', parsedMessage['AIL']);
  hl7Generator.addSegment('AIP', parsedMessage['AIP']);

  const hl7Message1 = hl7Generator.generateHl7();
  console.log(`Generated Message (Option 1): \n${hl7Message1}`);

  console.log('\n');

  // Option 2: Generate HL7 message with complete Json
  console.log('Option 2: Generate HL7 message with complete Json');
  const hl7Message2 = hl7Generator.generateHl7(parsedMessage);
  console.log(`Generated Message (Option 2): \n${hl7Message2}`);
} catch (error) {
  console.error(`Error:\n${error.message}`);
}
