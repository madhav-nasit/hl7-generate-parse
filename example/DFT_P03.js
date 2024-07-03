const { parseHL7Message, hl7MessageGenerator } = require('../index');

const hl7DFTMessage = `MSH|^~\\&|Healthmatics|Healthmatics EHR|Ntierprise|Ntierprise Clinic|20190416084748||DFT^P03|1477-3|P|2.3|||NE|NE
EVN|P03|20190416084748||01
PID|1|A4EMR640|640|67359|Test^Patient1^D||19700101|F||3|1212 Dillard Drive^^Cary^NC^27511|||(222)222-2222^^^^^222^2222222||S
PV1|1|R|MainOffi||||Manning^Manning^Terry^^^^^^&7654321&UPIN|||||||||||||||||||||||||||||||||||||20190416110000||||||1203
FT1|1|E8866||20190416110000|20190416110000|CG||||1||||||^^^MainOffi|||J11.1^INFLUENZA WITH OTHER RESPIRATORY MANIFESTATIONS^I10~487.1^INFLUENZA WITH OTHER RESPIRATORY MANIFESTATIONS^I9~J03.90^INFLUENZA WITH OTHER RESPIRATORY MANIFESTATIONS^I10~J40^BRONCHITIS, NOT SPECIFIED AS ACUTE OR CHRONIC^I10~490^BRONCHITIS, NOT SPECIFIED AS ACUTE OR CHRONIC^I9|TM^Manning^Terry^^^^^^&7654321&UPIN|Manning^Manning^Terry^^^^^^&7654321&UPIN||||99214^OFFICE OUTPATIENT VISIT 25 MINUTES
PR1|1||99214^OFFICE OUTPATIENT VISIT 25 MINUTES||20190416110000|D|||||||||J11.1^^I10
DG1|1|I|J11.1^INFLUENZA WITH OTHER RESPIRATORY MANIFESTATIONS^I10|||F
DG1|2|I|487.1^INFLUENZA WITH OTHER RESPIRATORY MANIFESTATIONS^I9|||F
DG1|3|I|J03.90^INFLUENZA WITH OTHER RESPIRATORY MANIFESTATIONS^I10|||F
DG1|4|I|J40^BRONCHITIS, NOT SPECIFIED AS ACUTE OR CHRONIC^I10|||F
DG1|5|I|490^BRONCHITIS, NOT SPECIFIED AS ACUTE OR CHRONIC^I9|||F`;

const parsedMessage = parseHL7Message(hl7DFTMessage);
console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

console.log('\n');

const hl7Generator = new hl7MessageGenerator();

try {
  // Option 1: Generate HL7 message with addSegment
  console.log('Option 1: Generate HL7 message with addSegment');
  hl7Generator.addSegment('MSH', parsedMessage['MSH']);
  hl7Generator.addSegment('EVN', parsedMessage['EVN']);
  hl7Generator.addSegment('PID', parsedMessage['PID']);
  hl7Generator.addSegment('PV1', parsedMessage['PV1']);
  hl7Generator.addSegment('FT1', parsedMessage['FT1']);
  hl7Generator.addSegment('PR1', parsedMessage['PR1']);
  hl7Generator.addSegment('DG1', parsedMessage['DG1'][0]);
  hl7Generator.addSegment('DG1', parsedMessage['DG1'][1]);
  hl7Generator.addSegment('DG1', parsedMessage['DG1'][2]);
  hl7Generator.addSegment('DG1', parsedMessage['DG1'][3]);
  hl7Generator.addSegment('DG1', parsedMessage['DG1'][4]);

  const hl7Message1 = hl7Generator.generateHl7();
  console.log(`Generated DFT Message (Option 1): \n${hl7Message1}`);

  console.log('\n');

  // Option 2: Generate HL7 message with complete Json
  console.log('Option 2: Generate HL7 message with complete Json');
  const hl7Message2 = hl7Generator.generateHl7(parsedMessage);
  console.log(`Generated DFT Message (Option 2): \n${hl7Message2}`);
} catch (error) {
  console.error(`Generate Error:\n${error.message}`);
}
