const { parseHL7Message, hl7MessageGenerator } = require('../index');

const hl7ORUMessage = `MSH|^~\\&|HL7|CG3_SICU|CE_CENTRAL|GH_CSF|20251014154001||ORU^R01|20251014154001-425|P|2.3||||||UNICODE UTF-8
PID|||10002^^^A^MR||RAPID^^|^^|||||^^^^^^^||||||||||||||||||
PV1||E|G52008|||||||||||||||||||||||||||||||||||||||||
OBR|1||||||20251014154001||||||||||||||||||||^^^^|||||||||
OBX|1|ST|HR||68|/min|||||R
OBX|2|ST|PVC||0|#/min|||||R
OBX|3|ST|RR||14|breaths/min|||||R
OBX|4|ST|CO2EX||28|mm(hg)|||||R
OBX|5|ST|CO2IN||3|mm(hg)|||||R
OBX|6|ST|CO2RR||14|breaths/min|||||R
OBX|7|ST|SPO2R||71|/min|||||R
OBX|8|ST|SPO2P||100|%|||||R`;

const parsedMessage = parseHL7Message(hl7ORUMessage);
console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

console.log('\n');

const hl7Generator = new hl7MessageGenerator();

try {
  // Option 1: Generate HL7 message with addSegment
  console.log('Option 1: Generate HL7 message with addSegment');
  hl7Generator.addSegment('MSH', parsedMessage['MSH']);
  hl7Generator.addSegment('PID', parsedMessage['PID']);
  hl7Generator.addSegment('PV1', parsedMessage['PV1']);
  hl7Generator.addSegment('OBR', parsedMessage['OBR']);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][0]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][1]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][2]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][3]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][4]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][5]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][6]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][7]);

  const hl7Message1 = hl7Generator.generateHl7();
  console.log(`Generated Message (Option 1): \n${hl7Message1}`);

  console.log('\n');

  // Option 2: Generate HL7 message with complete Json
  console.log('Option 2: Generate HL7 message with complete Json');
  const hl7Message2 = hl7Generator.generateHl7(parsedMessage);
  console.log(`Generated Message (Option 2): \n${hl7Message2}`);
} catch (error) {
  console.error(`Generate Error:\n${error.message}`);
}
