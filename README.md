# hl7-generate-parse

`hl7-generate-parse` is a Node.js library for parsing and generating HL7 (Health Level 7) messages to and from JSON format. This library supports various HL7 2.x segments and provides functionalities to handle parsing and generation of HL7 messages.

## Features

- **Parse HL7 v2.x messages** to JSON format.
- **Generate HL7 v2.x messages** from JSON data.
- Supports multiple **HL7 segments** commonly used in healthcare data exchange.

## Installation

To use `hl7-generate-parse` in your Node.js project, follow these steps:

1. **Install via npm:**

   ```bash
   npm install https://github.com/madhav-nasit/hl7-generate-parse.git
   ```

2. **Require the module:**
   ```javascript
   const { parseHL7Message, generateHL7Message } = require('hl7-generate-parse');
   ```

## Function Details

- **`parseHL7Message(hl7Message: string): object`**: Parses an HL7 message string into a JSON object.
- **`generateHL7Message(type: string, jsonObj: object): string`**:
  Validate and Generates an HL7 message string from a JSON object based on the specified message type.

## Supported Segments

This library supports parsing and generating the following HL7 segments:

- MSH: Message Header
- EVN: Event Type
- PID: Patient Identification
- PV1: Patient Visit
- GT1: Guarantor
- IN1: Insurance
- IN2: Insurance Additional Information
- IN3: Insurance Additional Information, Continued
- DG1: Diagnosis
- SCH: Schedule Activity Information
- RGS: Resource Group
- AIG: Appointment Information - General Resource
- AIL: Appointment Information - Location Resource
- AIP: Appointment Information - Personnel Resource
- FT1: Financial Transaction
- PR1: Procedures
- ROL: Role
- QRD: Query Definition
- MSA: Message Acknowledgment
- MFI: Master File Identification
- MFE: Master File Entry
- STF: Staff Identification
- PRA: Practitioner Information
- ORC: Common Order
- OBR: Observation Request
- OBX: Observation/Result

Segments not specifically listed above are handled generically by the library.

## Example

### Parsing HL7 to JSON

```javascript
const { parseHL7Message } = require('hl7-generate-parse');

const hl7ADTMessage = `MSH|^~\\&|ADT1|GOOD HEALTH HOSPITAL|GHH LAB, INC.|GOOD HEALTH HOSPITAL|198808181126|SECURITY|ADT^A01^ADT_A01|MSG00001|P|2.8||
EVN|A01|200708181123||
PID|1||PATID1234^5^M11^ADT1^MR^GOOD HEALTH HOSPITAL~123456789^^^USSSA^SS||EVERYMAN^ADAM^A^III||19610615|M||C|2222 HOME STREET^^GREENSBORO^NC^27401-1020|GL|(555) 555-2004|(555)555-2004||S||PATID12345001^2^M10^ADT1^AN^A|444333333|987654^NC|
NK1|1|NUCLEAR^NELDA^W|SPO^SPOUSE||||NK^NEXT OF KIN
PV1|1|I|2000^2012^01||||004777^ATTEND^AARON^A|||SUR||||ADM|A0|`;

try {
  const parsedMessage = parseHL7Message(hl7ADTMessage);
  console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);
} catch (error) {
  console.error(`Parsed Error:\n${error.message}`);
}
```

### Generating HL7 from JSON

```javascript
const { hl7MessageGenerator } = require('hl7-generate-parse');

const hl7JsonData = {
  MSH: [
    {
      MessageType: {
        MessageCode: 'ADT',
        TriggerEvent: 'A01',
      },
      FieldSeparator: '|',
      EncodingCharacters: '^~\\&',
      // Add more fields as needed
    },
  ],
  EVN: [
    {
      EventType: 'A01',
      // Add more fields as needed
    },
  ],
  // Include other segments like PID, PV1, etc.
};

const hl7Generator = new hl7MessageGenerator();

try {
  // Option 1: Generate HL7 message with addSegment
  console.log('Option 1: Generate HL7 message with addSegment');
  hl7Generator.addSegment('MSH', hl7JsonData['MSH']);
  hl7Generator.addSegment('EVN', hl7JsonData['EVN']);
  // Include other segments like PID, PV1, etc.

  const hl7Message1 = hl7Generator.generateHl7();
  console.log(`Generated Message (Option 1): \n${hl7Message1}`);

  console.log('\n');

  // Option 2: Generate HL7 message with complete Json
  console.log('Option 2: Generate HL7 message with complete Json');
  const hl7Message2 = hl7Generator.generateHl7(hl7JsonData);
  console.log(`Generated Message (Option 2): \n${hl7Message2}`);
} catch (error) {
  console.error(`Generate Error:\n${error.message}`);
}
```

### More Examples

For additional usage examples, refer to the [example](./example) file in this repository.
