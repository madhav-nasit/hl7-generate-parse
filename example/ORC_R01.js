const { parseHL7Message, hl7MessageGenerator } = require('../index');

const hl7ORCMessage = `MSH|^~\\&|PS360|SCL|PACS|PVMC|20190418225003||ORU^R01|12345|P|2.3
PID|||54658945213||Last^First||20190425|M|||^^^^^U SA|||||||20190425|000000001
PV1|1|E|PVED^ED02^ED02^EPVB^R||||1851634828^Last^F irst^E|1851634828^Last^First^E||1|||||||||37014421 4|||||||||||||||||||||||||20190418220755
ORC|CN
OBR|1|PV4430266CTPVMC|PV4430266CTPVMC|CT HEAD WO CONTRAST^CT HEAD WO CONTRAST|||20190418223311|||||||||1851634828^Last^ First^E||PV4430266CTPVMC|1|1|286701130|20190418224 856||CT|F||^^^20190418221731^20190418221355^S||||| 0052005^Last^First^A||||20190418221500
ORC|RE
OBR|2|PV4430267CTPVMC|PV4430267CTPVMC|CT CERVICAL SPINE WO CONTRAST^CT CERVICAL SPINE WO CONTRAST|||20190418223311|20190418221731||||||||18 51634828^HACKMAN^SCOTT^E||PV4430267CTPVMC|1|1|2867 01131|20190418224856||CT|F||^^^20190418221731^2019 0418221340^S|||||0052005^Last^First^A||||201904182 22000
OBX|1|TX|CT HEAD WO CONTRAST\T\BODY^CT HEAD WO CONTRAST||EXAMINATION: CT CERVICAL SPINE WO CONTRAST, CT HEAD WO CONTRAST||||||F|||20190418224856
OBX|2|TX|CT HEAD WO CONTRAST\T\BODY^CT HEAD WO CONTRAST||||||||F|||20190418224856
OBX|3|TX|CT HEAD WO CONTRAST\T\BODY^CT HEAD WO CONTRAST||DATE: 4/18/2019 10:17 PM||||||F|||20190418224856
OBX|4|TX|CT HEAD WO CONTRAST\T\BODY^CT HEAD WO CONTRAST|| ||||||F|||20190418224856
OBX|5|TX|CT HEAD WO CONTRAST\T\BODY^CT HEAD WO CONTRAST||INDICATION: Trauma, motorcycle accident, multiple lacerations, head and neck pain||||||F|||20190418224856`;

const parsedMessage = parseHL7Message(hl7ORCMessage);
console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

console.log('\n');

const hl7Generator = new hl7MessageGenerator();

try {
  // Option 1: Generate HL7 message with addSegment
  console.log('Option 1: Generate HL7 message with addSegment');
  hl7Generator.addSegment('MSH', parsedMessage['MSH']);
  hl7Generator.addSegment('PID', parsedMessage['PID']);
  hl7Generator.addSegment('PV1', parsedMessage['PV1']);
  hl7Generator.addSegment('ORC', parsedMessage['ORC'][0]);
  hl7Generator.addSegment('ORC', parsedMessage['ORC'][1]);
  hl7Generator.addSegment('OBR', parsedMessage['OBR'][0]);
  hl7Generator.addSegment('OBR', parsedMessage['OBR'][1]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][0]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][1]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][2]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][3]);
  hl7Generator.addSegment('OBX', parsedMessage['OBX'][4]);

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
