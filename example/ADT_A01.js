const { parseHL7Message, generateHL7Message } = require('../index');

const hl7ADTMessage = `MSH|^~\&|ADT1|GOOD HEALTH HOSPITAL|GHH LAB, INC.|GOOD HEALTH HOSPITAL|198808181126|SECURITY|ADT^A01^ADT_A01|MSG00001|P|2.8||
EVN|A01|200708181123||
PID|1||PATID1234^5^M11^ADT1^MR^GOOD HEALTH HOSPITAL~123456789^^^USSSA^SS||EVERYMAN^ADAM^A^III||19610615|M||C|2222 HOME STREET^^GREENSBORO^NC^27401-1020|GL|(555) 555-2004|(555)555-2004||S||PATID12345001^2^M10^ADT1^AN^A|444333333|987654^NC|
NK1|1|NUCLEAR^NELDA^W|SPO^SPOUSE||||NK^NEXT OF KIN
PV1|1|I|2000^2012^01||||004777^ATTEND^AARON^A|||SUR||||ADM|A0|`;

const parsedMessage = parseHL7Message(hl7ADTMessage);
console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

console.log('\n');
try {
  const hl7Message = generateHL7Message(parsedMessage);
  console.log(`Generated ADT Message: \n${hl7Message}`);
} catch (error) {
  console.error(`Generate Error:\n${error.message}`);
}
