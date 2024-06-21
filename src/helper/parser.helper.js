// XCN - Extended Composite ID Number and Name for Persons
const formatPersonData = (person, encChars, separator = encChars[0]) => {
  const components = person.split(separator);
  return {
    IDNumber: components[0],
    FamilyName: components[1],
    GivenName: components[2],
    SecondAndFurtherGivenNamesOrInitialsThereof: components[3],
    Suffix: components[4],
    Prefix: components[5],
    Degree: components[6],
    SourceTable: components[7],
    AssigningAuthority: components[8] ? formatHierarchicDesignator(components[8], encChars, encChars[2]) : null,
    NameTypeCode: components[9],
    IdentifierCheckDigit: components[10],
    CheckDigitScheme: components[11],
    IdentifierTypeCode: components[12],
    AssigningFacility: components[13] ? formatHierarchicDesignator(components[13], encChars, encChars[2]) : null,
    NameRepresentationCode: components[14],
    NameContext: components[15],
    NameValidityRange: components[16],
    NameAssemblyOrder: components[17],
    EffectiveDate: components[18],
    ExpirationDate: components[19],
    ProfessionalSuffix: components[20],
    AssigningJurisdiction: components[21],
    AssigningAgencyOrDepartment: components[22],
  };
};

const formatPersonName = (person, encChars, separator = encChars[0]) => {
  const components = person.split(separator);
  return {
    FamilyName: components[0],
    GivenName: components[1],
    SecondAndFurtherGivenNamesOrInitialsThereof: components[2],
    Suffix: components[3],
    Prefix: components[4],
    Degree: components[5],
    NameTypeCode: components[6],
    NameRepresentationCode: components[7],
    NameContext: components[8],
    NameValidityRange: components[9],
    NameAssemblyOrder: components[10],
    EffectiveDate: components[11],
    ExpirationDate: components[12],
    ProfessionalSuffix: components[13],
  };
};

/**
 * PL - Person Location
 * @param {*} location
 * @returns
 */
const formatPersonLocation = (location, encChars, separator = encChars[0]) => {
  const components = location.split(separator);
  return {
    PointOfCare: components[0],
    Room: components[1],
    Bed: components[2],
    Facility: components[3],
    LocationStatus: components[4],
    PersonLocationType: components[5],
    Building: components[6],
    Floor: components[7],
    LocationDescription: components[8],
    ComprehensiveLocationIdentifier: components[9],
    AssigningAuthorityForLocation: components[10],
  };
};

/**
 * CX - Extended Composite ID with Check Digit
 * @param {*} visit
 * @returns
 */
const formatCheckDigit = (visit, encChars, separator = encChars[0]) => {
  const components = visit.split(separator);
  return {
    IdNumber: components[0],
    CheckDigit: components[1],
    CheckDigitScheme: components[2],
    AssigningAuthority: components[3] ? formatHierarchicDesignator(components[3], encChars, encChars[2]) : null,
    IdentifierTypeCode: components[4],
    AssigningFacility: components[5] ? formatHierarchicDesignator(components[5], encChars, encChars[2]) : null,
    EffectiveDate: components[6],
    ExpirationDate: components[7],
    AssigningJurisdiction: components[8] ? formatCodedElementWithNoExceptions(components[8], encChars) : null,
    AssigningAgencyOrDepartment: components[9] ? formatCodedElementWithNoExceptions(components[9], encChars) : null,
  };
};

// CE - Coded Element
const formatCodedElement = (element, encChars, separator = encChars[0]) => {
  const components = element.split(separator);
  return {
    Identifier: components[0],
    Text: components[1],
    NameOfCodingSystem: components[2],
    AlternateIdentifier: components[3],
    AlternateText: components[4],
    NameOfAlternateCodingSystem: components[5],
  };
};

const formatCodedElementWithNoExceptions = (element, encChars, separator = encChars[0]) => {
  const components = element.split(separator);
  return {
    ...formatCodedElement(element, encChars),
    CodingSystemVersionID: components[6],
    AlternateCodingSystemVersionID: components[7],
    OriginalText: components[8],
  };
};

const formatTelecommunication = (element, encChars, separator = encChars[0]) => {
  const components = element.split(separator);
  return {
    TelephoneNumber: components[0],
    TelecommunicationUseCode: components[1],
    TelecommunicationEquipmentType: components[2],
    EmailAddress: components[3],
    CountryCode: components[4],
    AreaCityCode: components[5],
    LocalNumber: components[6],
    Extension: components[7],
    AnyText: components[8],
    ExtensionPrefix: components[9],
    SpeedDialCode: components[10],
    UnformattedTelephoneNumber: components[11],
  };
};

/**
 * XAD - Extended Address
 * @param {*} address
 * @returns
 */
const formatAddress = (address, encChars, separator = encChars[0]) => {
  const components = address.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    StreetAddress: {
      StreetOrMailingAddress: components[0].split(nestedSeparator)[0],
      StreetName: components[0].split(nestedSeparator)[1],
      DwellingNumber: components[0].split(nestedSeparator)[2],
    },
    OtherDesignation: components[1],
    City: components[2],
    StateOrProvince: components[3],
    ZipOrPostalCode: components[4],
    Country: components[5],
    AddressType: components[6],
    OtherGeographicDesignation: components[7],
    CountyParishCode: components[8],
    CensusTract: components[9],
    AddressRepresentationCode: components[10],
    AddressValidityRange: components[11],
    EffectiveDate: components[12],
    ExpirationDate: components[13],
  };
};

/**
 * HD - Hierarchic Designator
 * @param {*} element
 * @param {*} separator
 * @returns
 */
const formatHierarchicDesignator = (element, encChars, separator = encChars[0]) => {
  const components = element.split(separator);
  return {
    NamespaceID: components[0],
    UniversalID: components[1],
    UniversalIdType: components[2],
  };
};

const formatOrganizations = (organization, encChars, separator = encChars[0]) => {
  const components = organization.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    OrganizationName: components[0],
    OrganizationNameTypeCode: components[1],
    IdNumber: components[2],
    CheckDigit: components[3],
    CheckDigitScheme: components[4],
    AssigningAuthority: components[5] ? formatHierarchicDesignator(components[5], encChars, nestedSeparator) : null,
    IdentifierTypeCode: components[6],
    AssigningFacility: components[7] ? formatHierarchicDesignator(components[7], encChars, nestedSeparator) : null,
    NameRepresentationCode: components[8],
    OrganizationIdentifier: components[9],
  };
};

const formatPrice = (price, encChars, separator = encChars[0]) => {
  const components = price.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    Price: components[0],
    PriceType: components[1],
    FromValue: components[2],
    ToValue: components[3],
    RangeUnits: components[4] ? formatCodedElement(components[4], encChars, nestedSeparator) : null,
    RangeType: components[5],
  };
};

/**
 * JCC - Job Code/Class
 * @param {*} job
 * @returns
 */
const formatJobCode = (job, encChars, separator = encChars[0]) => {
  const components = job.split(separator);
  return {
    JobCode: components[0],
    JobClass: components[1],
    JobDescriptionText: components[2],
  };
};

const formatRoomCoverage = (roomCoverage, encChars, separator = encChars[0]) => {
  const components = roomCoverage.split(separator);
  return {
    RoomType: components[0],
    AmountType: components[1],
    CoverageAmount: components[2],
    MoneyOrPercentage: components[3],
  };
};

const formatPolicyTypeAmount = (policyTypeAmount, encChars, separator = encChars[0]) => {
  const components = policyTypeAmount.split(separator);
  return {
    PolicyType: components[0],
    AmountClass: components[1],
    MoneyOrPercentageQuantity: components[2],
    MoneyOrPercentage: components[3],
  };
};

const formatDailyDeductible = (dailyDeductible, encChars, separator = encChars[0]) => {
  const components = dailyDeductible.split(separator);
  return {
    DelayDays: components[0],
    MonetaryAmount: components[1],
    NumberOfDays: components[2],
  };
};

// EI - Entity Identifier
const formatEntityIdentifier = (element, encChars, separator = encChars[0]) => {
  const components = element.split(separator);
  return {
    EntityIdentifier: components[0],
    NamespaceId: components[1],
    UniversalId: components[2],
    UniversalIdType: components[3],
  };
};

const formatTimingQuantity = (element, encChars, separator = encChars[0]) => {
  const components = element.split(separator);
  const nestedSeparator = encChars[2] ?? '&';

  return {
    Quantity: components[0] ? formatCompositeQuantity(components[0], encChars, nestedSeparator) : null,
    Interval: components[1]
      ? {
          RepeatPattern: components[1].split(nestedSeparator)[0],
          ExplicitTimeInterval: components[1].split(nestedSeparator)[1],
        }
      : null,
    Duration: components[2],
    StartDateTime: components[3],
    EndDateTime: components[4],
    Priority: components[5],
    Condition: components[6],
    Text: components[7],
    Conjunction: components[8],
    OrderSequencing: components[9] ? formatOrderSequenceDefinition(components[9], encChars) : null,
    OccurrenceDuration: components[10] ? formatCodedElement(components[10], encChars, nestedSeparator) : null,
    TotalOccurrences: components[11],
  };
};

const formatOrderSequenceDefinition = (element, encChars) => {
  const components = element.split(encChars[2]);
  return {
    SequenceResultsFlag: components[0],
    PlacerOrderNumberEntityIdentifier: components[1],
    PlacerOrderNumberNamespaceId: components[2],
    FillerOrderNumberEntityIdentifier: components[3],
    FillerOrderNumberNamespaceId: components[4],
    SequenceConditionValue: components[5],
    MaximumNumberOfRepeats: components[6],
    PlacerOrderNumberUniversalId: components[7],
    PlacerOrderNumberUniversalIdType: components[8],
    FillerOrderNumberUniversalId: components[9],
    FillerOrderNumberUniversalIdType: components[10],
  };
};

/**
 * MSG - Message Type
 * @param {*} segment
 * @returns
 */
const formatMSGSegment = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  return {
    MessageCode: components[0],
    TriggerEvent: components[1],
    MessageStructure: components[2],
  };
};

/**
 * PT - Processing Type
 * @param {*} segment
 * @returns
 */
const formatProcessingType = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  return {
    ProcessingId: components[0],
    ProcessingMode: components[1],
  };
};

/**
 * VID - Version Identifier
 * @param {*} segment
 * @returns
 */
const formatVersionIdentifier = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    VersionId: components[0],
    InternationalizationCode: components[1] ? formatCodedElement(components[1], encChars, nestedSeparator) : null,
    InternationalVersionId: components[2] ? formatCodedElement(components[2], encChars, nestedSeparator) : null,
  };
};

/**
 * DLN - Driver License Number
 * @param {*} dlnSegment
 * @returns
 */
const formatDriverLicenseNumber = (dlnSegment, encChars, separator = encChars[0]) => {
  const components = dlnSegment.split(separator);

  return {
    LicenseNumber: components[0],
    IssuingStateProvinceCountry: components[1],
    ExpirationDate: components[2],
  };
};

/**
 *  FC - Financial Class
 * @param {*} fcSegment
 * @returns
 */
const formatFinancialClass = (fcSegment, encChars, separator = encChars[0]) => {
  const components = fcSegment.split(separator);

  return {
    FinancialClassCode: components[0],
    EffectiveDate: components[1],
  };
};

/**
 * DLD - Discharge Location and Date
 * @param {*} dldSegment
 * @returns
 */
const formatDischargeLocationAndDate = (dldSegment, encChars, separator = encChars[0]) => {
  const components = dldSegment.split(separator);

  return {
    DischargeLocation: components[0],
    EffectiveDate: components[1],
  };
};

/**
 * AUI - Authorization Information
 * @param {*} auiSegment
 * @returns
 */
const formatAuthorizationInformation = (auiSegment, encChars, separator = encChars[0]) => {
  const components = auiSegment.split(separator);

  return {
    AuthorizationNumber: components[0],
    Date: components[1],
    Source: components[2],
  };
};

/**
 * CQ - Composite Quantity with Units
 * @param {*} quantity
 * @returns
 */
const formatCompositeQuantity = (quantity, encChars, separator = encChars[0]) => {
  const components = quantity.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    Quantity: components[0],
    Units: components[1] ? formatCodedElement(components[1], encChars, nestedSeparator) : null,
  };
};

/**
 * MOP - Money or Percentage
 * @param {*} mop
 * @returns
 */
const formatMoneyOrPercentage = (mop, encChars, separator = encChars[0]) => {
  const components = mop.split(separator);
  return {
    MoneyOrPercentageIndicator: components[0],
    MoneyOrPercentageQuantity: components[1],
    CurrencyDenomination: components[2],
  };
};

/**
 * DTN - Day Type and Number
 * @param {*} dtn
 * @returns
 */
const formatDayTypeAndNumber = (dtn, encChars, separator = encChars[0]) => {
  const components = dtn.split(separator);
  return {
    DayType: components[0],
    NumberOfDays: components[1],
  };
};

/**
 * ICD - Insurance Certification Definition
 * @param {*} icd
 * @returns
 */
const formatInsuranceCertificationDefinition = (icd, encChars, separator = encChars[0]) => {
  const components = icd.split(separator);
  return {
    CertificationPatientType: components[0],
    CertificationRequired: components[1],
    DateTimeCertificationRequired: components[2],
  };
};

const parsePrimaryKeyValues = (values, encChars, separator = encChars[0]) => {
  return values ? values.split(separator) : [];
};

/**
 * DIN - Date and Institution Name
 * @param {*} segment
 * @returns
 */
const formatDIN = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    Date: components[0],
    InstitutionName: components[1] ? formatCodedElement(components[1], encChars, nestedSeparator) : null,
  };
};

const formatSPD = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  return {
    SpecialtyName: components[0],
    GoverningBoard: components[1],
    EligibleOrCertified: components[2],
    DateOfCertification: components[3],
  };
};

const formatPLN = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  return {
    IdNumber: components[0],
    TypeOfIdNumber: components[1],
    StateOrOtherQualifyingInfo: components[2],
    ExpirationDate: components[3],
  };
};

/**
 * PIP - Practitioner Institutional Privileges
 * @param {*} segment
 * @returns
 */
const formatPIP = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    Privilege: components[0] ? formatCodedElement(components[0], encChars, nestedSeparator) : null,
    PrivilegeClass: components[1] ? formatCodedElement(components[1], encChars, nestedSeparator) : null,
    ExpirationDate: components[2],
    ActivationDate: components[3],
    Facility: components[4] ? formatEntityIdentifier(components[4], encChars, nestedSeparator) : null,
  };
};

/**
 * EIP - Entity Identifier Pair
 * @param {*} segment
 * @returns
 */
const formatEIP = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';
  return {
    PlacerAssignedIdentifier: components[0] ? formatEntityIdentifier(components[0], encChars, nestedSeparator) : null,
    FillerAssignedIdentifier: components[1] ? formatEntityIdentifier(components[1], encChars, nestedSeparator) : null,
  };
};

/**
 * SPS - Specimen Source
 * @param {*} segment
 * @returns
 */
const formatSPS = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';

  return {
    SpecimenSourceNameOrCode: components[0] ? formatCodedElement(components[0], encChars, nestedSeparator) : null,
    Additives: components[1] ? formatCodedElement(components[1], encChars, nestedSeparator) : null,
    SpecimenCollectionMethod: components[2] ? formatCodedElement(components[2], encChars, nestedSeparator) : null,
    BodySite: components[3] ? formatCodedElement(components[3], encChars, nestedSeparator) : null,
    SiteModifier: components[4] ? formatCodedElement(components[4], encChars, nestedSeparator) : null,
    CollectionMethodModifierCode: components[5] ? formatCodedElement(components[5], encChars, nestedSeparator) : null,
    SpecimenRole: components[6] ? formatCodedElement(components[6], encChars, nestedSeparator) : null,
  };
};

/**
 *
 * @param {*} segment
 * @returns
 */
const formatMOC = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';

  return {
    MonetaryAmount: components[0],
    ChargeCode: components[1] ? formatCodedElement(components[1], encChars, nestedSeparator) : null,
  };
};

/**
 * Helper function to format Observation Request Parent Result
 * @param {*} result
 * @returns
 */
const formatPRL = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';

  return {
    ParentObservationIdentifier: components[0] ? formatCodedElement(components[0], encChars, nestedSeparator) : null,
    ParentObservationSubIdentifier: components[1],
    ParentObservationValueDescriptor: components[2],
  };
};

/**
 * NDL - Name with Date and Location
 * @param {*} segment
 * @returns
 */
const formatNDL = (segment, encChars, separator = encChars[0]) => {
  const components = segment.split(separator);
  const nestedSeparator = encChars[2] ?? '&';

  return {
    Name: components[0] ? formatPersonData(components[0], encChars, nestedSeparator) : null,
    StartDateTime: components[1],
    EndDateTime: components[2],
    PointOfCare: components[3],
    Room: components[4],
    Bed: components[5],
    Facility: components[6] ? formatHierarchicDesignator(components[6]) : null,
    LocationStatus: components[7],
    PatientLocationType: components[8],
    Building: components[9],
    Floor: components[10],
  };
};

const processRepeatableField = (data, encChars, formatFunction = (x) => x) =>
  data ? data.split(encChars[1]).map((item) => formatFunction(item, encChars)) : [];

module.exports = {
  formatPersonData,
  formatPersonLocation,
  formatCheckDigit,
  formatCodedElement,
  formatCodedElementWithNoExceptions,
  formatTelecommunication,
  formatPersonName,
  formatAddress,
  formatOrganizations,
  formatPrice,
  formatJobCode,
  formatRoomCoverage,
  formatPolicyTypeAmount,
  formatDailyDeductible,
  formatEntityIdentifier,
  formatHierarchicDesignator,
  formatTimingQuantity,
  formatOrderSequenceDefinition,
  formatMSGSegment,
  formatProcessingType,
  formatVersionIdentifier,
  formatDriverLicenseNumber,
  formatFinancialClass,
  formatDischargeLocationAndDate,
  formatAuthorizationInformation,
  formatCompositeQuantity,
  formatMoneyOrPercentage,
  formatDayTypeAndNumber,
  formatInsuranceCertificationDefinition,
  parsePrimaryKeyValues,
  formatDIN,
  formatSPD,
  formatPLN,
  formatPIP,
  formatEIP,
  formatSPS,
  formatMOC,
  formatPRL,
  formatNDL,
  processRepeatableField,
};
