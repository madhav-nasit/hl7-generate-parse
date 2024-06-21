const { parseHL7Message, generateHL7Message } = require('../index');

const hl7ORUMessage = `MSH|^~\&|HL7|CG3_SICU|CE_CENTRAL|GH_CSF|20251014154001||ORU^R01|20251014154001-425|P|2.3||||||UNICODE UTF-8
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
try {
  const hl7Message = generateHL7Message(parsedMessage);
  console.log(`Generated Message: \n${hl7Message}`);
} catch (error) {
  console.error(`Generate Error:\n${error.message}`);
}
