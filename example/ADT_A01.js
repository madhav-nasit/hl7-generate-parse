const { parseHL7Message, hl7MessageGenerator } = require('../index');

try {
  const hl7ADTMessage = `MSH|^~\\&|ADT1|GOOD HEALTH HOSPITAL|GHH LAB, INC.|GOOD HEALTH HOSPITAL|198808181126|SECURITY|ADT^A01^ADT_A01|MSG00001|P|2.8||
EVN|A01|200708181123||
PID|1||PATID1234^5^M11^ADT1^MR^GOOD HEALTH HOSPITAL~123456789^^^USSSA^SS||EVERYMAN^ADAM^A^III||19610615|M||C|2222 HOME STREET^^GREENSBORO^NC^27401-1020|GL|(555) 555-2004|(555)555-2004||S||PATID12345001^2^M10^ADT1^AN^A|444333333|987654^NC|
NK1|1|NUCLEAR^NELDA^W|SPO^SPOUSE||||NK^NEXT OF KIN
PV1|1|I|2000^2012^01||||004777^ATTEND^AARON^A|||SUR||||ADM|A0|`;

  const parsedMessage = parseHL7Message(hl7ADTMessage);
  console.log(`Parsed Message: \n${JSON.stringify(parsedMessage, null, 2)}`);

  console.log('\n');

  const hl7Generator = new hl7MessageGenerator();

  const hl7JsonMsg = {
    MSH: {
      FieldSeparator: '|',
      EncodingCharacters: '^~\\&',
      SendingApplication: {
        NamespaceID: 'ADT1',
      },
      SendingFacility: {
        NamespaceID: 'GOOD HEALTH HOSPITAL',
      },
      ReceivingApplication: {
        NamespaceID: 'GHH LAB, INC.',
      },
      ReceivingFacility: {
        NamespaceID: 'GOOD HEALTH HOSPITAL',
      },
      DateTimeOfMessage: '198808181126',
      Security: 'SECURITY',
      MessageType: {
        MessageCode: 'ADT',
        TriggerEvent: 'A01',
        MessageStructure: 'ADT_A01',
      },
      MessageControlID: 'MSG00001',
      ProcessingID: {
        ProcessingId: 'P',
      },
      VersionID: {
        VersionId: '2.8',
        InternationalizationCode: null,
        InternationalVersionId: null,
      },
      SequenceNumber: '',
      ContinuationPointer: '',
      CharacterSet: [],
      PrincipalLanguageOfMessage: null,
      MessageProfileIdentifier: [],
    },
    EVN: {
      EventTypeCode: 'A01',
      RecordedDateTime: '200708181123',
      DateTimePlannedEvent: '',
      EventReasonCode: '',
      OperatorID: [],
      EventFacility: null,
    },
    PID: {
      SetID: '1',
      PatientID: null,
      PatientIdentifierList: [
        {
          IdNumber: 'PATID1234',
          CheckDigit: '5',
          CheckDigitScheme: 'M11',
          AssigningAuthority: {
            NamespaceID: 'ADT1',
          },
          IdentifierTypeCode: 'MR',
          AssigningFacility: {
            NamespaceID: 'GOOD HEALTH HOSPITAL',
          },
          AssigningJurisdiction: null,
          AssigningAgencyOrDepartment: null,
        },
        {
          IdNumber: '123456789',
          CheckDigit: '',
          CheckDigitScheme: '',
          AssigningAuthority: {
            NamespaceID: 'USSSA',
          },
          IdentifierTypeCode: 'SS',
          AssigningFacility: null,
          AssigningJurisdiction: null,
          AssigningAgencyOrDepartment: null,
        },
      ],
      AlternatePatientID: [],
      PatientName: [
        {
          FamilyName: 'EVERYMAN',
          GivenName: 'ADAM',
          SecondAndFurtherGivenNamesOrInitialsThereof: 'A',
          Suffix: 'III',
        },
      ],
      MotherMaidenName: [],
      DateOfBirth: '19610615',
      AdministrativeSex: 'M',
      PatientAlias: [],
      Race: [
        {
          Identifier: 'C',
        },
      ],
      PatientAddress: [
        {
          StreetAddress: {
            StreetOrMailingAddress: '2222 HOME STREET',
          },
          OtherDesignation: '',
          City: 'GREENSBORO',
          StateOrProvince: 'NC',
          ZipOrPostalCode: '27401-1020',
        },
      ],
      CountyCode: 'GL',
      HomePhoneNumber: [
        {
          TelephoneNumber: '(555) 555-2004',
        },
      ],
      BusinessPhoneNumber: [
        {
          TelephoneNumber: '(555)555-2004',
        },
      ],
      PrimaryLanguage: null,
      MaritalStatus: {
        Identifier: 'S',
      },
      Religion: null,
      PatientAccountNumber: {
        IdNumber: 'PATID12345001',
        CheckDigit: '2',
        CheckDigitScheme: 'M10',
        AssigningAuthority: {
          NamespaceID: 'ADT1',
        },
        IdentifierTypeCode: 'AN',
        AssigningFacility: {
          NamespaceID: 'A',
        },
        AssigningJurisdiction: null,
        AssigningAgencyOrDepartment: null,
      },
      SSNNumber: '444333333',
      DriverLicenseNumber: {
        LicenseNumber: '987654',
        IssuingStateProvinceCountry: 'NC',
      },
      MotherIdentifier: [],
      EthnicGroup: [],
      Citizenship: [],
      VeteransMilitaryStatus: null,
      Nationality: null,
      IdentityReliabilityCode: [],
      LastUpdateFacility: null,
      SpeciesCode: null,
      BreedCode: null,
      ProductionClassCode: [],
      TribalCitizenship: [],
    },
    NK1: {
      'NK1.1': '1',
      'NK1.2': {
        'NK1.2.1': 'NUCLEAR',
        'NK1.2.2': 'NELDA',
        'NK1.2.3': 'W',
      },
      'NK1.3': {
        'NK1.3.1': 'SPO',
        'NK1.3.2': 'SPOUSE',
      },
      'NK1.4': '',
      'NK1.5': '',
      'NK1.6': '',
      'NK1.7': {
        'NK1.7.1': 'NK',
        'NK1.7.2': 'NEXT OF KIN',
      },
    },
    PV1: {
      SetID: '1',
      PatientClass: 'I',
      AssignedPatientLocation: {
        PointOfCare: '2000',
        Room: '2012',
        Bed: '01',
      },
      AdmissionType: '',
      PreadmitNumber: null,
      PriorPatientLocation: null,
      AttendingDoctor: [
        {
          IDNumber: '004777',
          FamilyName: 'ATTEND',
          GivenName: 'AARON',
          SecondAndFurtherGivenNamesOrInitialsThereof: 'A',
          AssigningAuthority: null,
          AssigningFacility: null,
        },
      ],
      ReferringDoctor: [],
      ConsultingDoctor: [],
      HospitalService: 'SUR',
      TemporaryLocation: null,
      PreadmitTestIndicator: '',
      ReAdmissionIndicator: '',
      AdmitSource: 'ADM',
      AmbulatoryStatus: ['A0'],
      VIPIndicator: '',
      AdmittingDoctor: [],
      VisitNumber: null,
      FinancialClass: [],
      ContractCode: [],
      ContractEffectiveDate: [],
      ContractAmount: [],
      ContractPeriod: [],
      DischargedToLocation: null,
      DietType: null,
      PendingLocation: null,
      PriorTemporaryLocation: null,
      DischargeDateTime: [],
      AlternateVisitID: null,
      OtherHealthcareProvider: [],
    },
  };

  // Option 1: Generate HL7 message with addSegment
  console.log('Option 1: Generate HL7 message with addSegment');
  hl7Generator.addSegment('MSH', hl7JsonMsg['MSH']);
  hl7Generator.addSegment('EVN', hl7JsonMsg['EVN']);
  hl7Generator.addSegment('PID', hl7JsonMsg['PID']);
  hl7Generator.addSegment('NK1', hl7JsonMsg['NK1']);
  hl7Generator.addSegment('PV1', hl7JsonMsg['PV1']);

  const hl7Message1 = hl7Generator.generateHl7();
  console.log(hl7Message1);

  console.log('\n');

  // Option 2: Generate HL7 message with complete Json
  console.log('Option 2: Generate HL7 message with complete Json');
  const hl7Message2 = hl7Generator.generateHl7(hl7JsonMsg);
  console.log(hl7Message2);
} catch (error) {
  console.error(error.message);
}
