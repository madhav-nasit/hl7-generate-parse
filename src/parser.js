const {
  formatPersonData,
  formatPersonLocation,
  formatCheckDigit,
  formatCodedElement,
  formatTelecommunication,
  formatPersonName,
  formatAddress,
  formatOrganizations,
  formatPrice,
  formatJobCode,
  formatRoomCoverage,
  formatDailyDeductible,
  formatPolicyTypeAmount,
  formatEntityIdentifier,
  formatTimingQuantity,
  formatCodedElementWithNoExceptions,
  formatHierarchicDesignator,
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
} = require('./helper');

/**
 * MSH - Message Header
 * The MSH segment defines the intent, source, destination, and some specifics of the syntax of a message.
 * @param {*} segment
 */
const parseMSHSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    FieldSeparator: separator,
    EncodingCharacters: components[1],
    SendingApplication: components[2] ? formatHierarchicDesignator(components[2], encChars) : null,
    SendingFacility: components[3] ? formatHierarchicDesignator(components[3], encChars) : null,
    ReceivingApplication: components[4] ? formatHierarchicDesignator(components[4], encChars) : null,
    ReceivingFacility: components[5] ? formatHierarchicDesignator(components[5], encChars) : null,
    DateTimeOfMessage: components[6],
    Security: components[7],
    MessageType: components[8] ? formatMSGSegment(components[8], encChars) : null,
    MessageControlID: components[9],
    ProcessingID: components[10] ? formatProcessingType(components[10], encChars) : null,
    VersionID: components[11] ? formatVersionIdentifier(components[11], encChars) : null,
    SequenceNumber: components[12],
    ContinuationPointer: components[13],
    AcceptAcknowledgmentType: components[14],
    ApplicationAcknowledgmentType: components[15],
    CountryCode: components[16],
    CharacterSet: processRepeatableField(components[17], encChars),
    PrincipalLanguageOfMessage: components[18] ? formatCodedElement(components[18], encChars) : null,
    AlternateCharacterSetHandlingScheme: components[19],
    MessageProfileIdentifier: processRepeatableField(components[20], encChars, formatEntityIdentifier),
  };
};

/**
 * EVN - Event Type
 * The EVN segment is used to communicate necessary trigger event information to receiving applications. Valid event types for all chapters are contained in HL7 Table 0003 - Event Type .
 * @param {*} segment
 */
const parseEVNSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    EventTypeCode: components[1],
    RecordedDateTime: components[2],
    DateTimePlannedEvent: components[3],
    EventReasonCode: components[4],
    OperatorID: processRepeatableField(components[5], encChars, formatPersonData),
    EventOccurred: components[6],
    EventFacility: components[7] ? formatHierarchicDesignator(components[7], encChars) : null,
  };
};

/**
 * PID - Patient Identification
 * The PID segment is used by all applications as the primary means of communicating patient identification information. This segment contains permanent patient identifying and demographic information that, for the most part, is not likely to change frequently.
 * @param {*} segment
 */
const parsePIDSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetID: components[1],
    PatientID: components[2] ? formatCheckDigit(components[2], encChars) : null,
    PatientIdentifierList: processRepeatableField(components[3], encChars, formatCheckDigit),
    AlternatePatientID: processRepeatableField(components[4], encChars, formatCheckDigit),
    PatientName: processRepeatableField(components[5], encChars, formatPersonName),
    MotherMaidenName: processRepeatableField(components[6], encChars, formatPersonName),
    DateOfBirth: components[7],
    AdministrativeSex: components[8],
    PatientAlias: processRepeatableField(components[9], encChars, formatPersonName),
    Race: processRepeatableField(components[10], encChars, formatCodedElement),
    PatientAddress: processRepeatableField(components[11], encChars, formatAddress),
    CountyCode: components[12],
    HomePhoneNumber: processRepeatableField(components[13], encChars, formatTelecommunication),
    BusinessPhoneNumber: processRepeatableField(components[14], encChars, formatTelecommunication),
    PrimaryLanguage: components[15] ? formatCodedElement(components[15], encChars) : null,
    MaritalStatus: components[16] ? formatCodedElement(components[16], encChars) : null,
    Religion: components[17] ? formatCodedElement(components[17], encChars) : null,
    PatientAccountNumber: components[18] ? formatCheckDigit(components[18], encChars) : null,
    SSNNumber: components[19],
    DriverLicenseNumber: components[20] ? formatDriverLicenseNumber(components[20], encChars) : null,
    MotherIdentifier: processRepeatableField(components[21], encChars, formatCheckDigit),
    EthnicGroup: processRepeatableField(components[22], encChars, formatCodedElement),
    BirthPlace: components[23],
    MultipleBirthIndicator: components[24],
    BirthOrder: components[25],
    Citizenship: processRepeatableField(components[26], encChars, formatCodedElement),
    VeteransMilitaryStatus: components[27] ? formatCodedElement(components[27], encChars) : null,
    Nationality: components[28] ? formatCodedElement(components[28], encChars) : null,
    PatientDeathDateTime: components[29],
    PatientDeathIndicator: components[30],
    IdentityUnknownIndicator: components[31],
    IdentityReliabilityCode: processRepeatableField(components[32], encChars),
    LastUpdateDateTime: components[33],
    LastUpdateFacility: components[34] ? formatHierarchicDesignator(components[34], encChars) : null,
    SpeciesCode: components[35] ? formatCodedElement(components[35], encChars) : null,
    BreedCode: components[36] ? formatCodedElement(components[36], encChars) : null,
    Strain: components[37],
    ProductionClassCode: processRepeatableField(components[38], encChars, formatCodedElement),
    TribalCitizenship: processRepeatableField(components[39], encChars, formatCodedElementWithNoExceptions),
  };
};

/**
 * PV1 - Patient Visit
 * The PV1 segment is used by Registration/Patient Administration applications to communicate information on an account or visit-specific basis. The default is to send account level data. To use this segment for visit level data PV1-51 - Visit Indicator must be valued to V. The value of PV-51 affects the level of data being sent on the PV1, PV2, and any other segments that are part of the associated PV1 hierarchy (e.g. ROL, DG1, or OBX).
 * @param {*} segment
 */
const parsePV1Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetID: components[1],
    PatientClass: components[2],
    AssignedPatientLocation: components[3] ? formatPersonLocation(components[3], encChars) : null,
    AdmissionType: components[4],
    PreadmitNumber: components[5] ? formatCheckDigit(components[5], encChars) : null,
    PriorPatientLocation: components[6] ? formatPersonLocation(components[6], encChars) : null,
    AttendingDoctor: processRepeatableField(components[7], encChars, formatPersonData),
    ReferringDoctor: processRepeatableField(components[8], encChars, formatPersonData),
    ConsultingDoctor: processRepeatableField(components[9], encChars, formatPersonData),
    HospitalService: components[10],
    TemporaryLocation: components[11] ? formatPersonLocation(components[11], encChars) : null,
    PreadmitTestIndicator: components[12],
    ReAdmissionIndicator: components[13],
    AdmitSource: components[14],
    AmbulatoryStatus: processRepeatableField(components[15], encChars),
    VIPIndicator: components[16],
    AdmittingDoctor: processRepeatableField(components[17], encChars, formatPersonData),
    PatientType: components[18],
    VisitNumber: components[19] ? formatCheckDigit(components[19], encChars) : null,
    FinancialClass: processRepeatableField(components[20], encChars, formatFinancialClass),
    ChargePriceIndicator: components[21],
    CourtesyCode: components[22],
    CreditRating: components[23],
    ContractCode: processRepeatableField(components[24], encChars),
    ContractEffectiveDate: processRepeatableField(components[25], encChars),
    ContractAmount: processRepeatableField(components[26], encChars),
    ContractPeriod: processRepeatableField(components[27], encChars),
    InterestCode: components[28],
    TransferToBadDebtCode: components[29],
    TransferToBadDebtDate: components[30],
    BadDebtAgencyCode: components[31],
    BadDebtTransferAmount: components[32],
    BadDebtRecoveryAmount: components[33],
    DeleteAccountIndicator: components[34],
    DeleteAccountDate: components[35],
    DischargeDisposition: components[36],
    DischargedToLocation: components[37] ? formatDischargeLocationAndDate(components[37], encChars) : null,
    DietType: components[38] ? formatCodedElement(components[38], encChars) : null,
    ServicingFacility: components[39],
    BedStatus: components[40],
    AccountStatus: components[41],
    PendingLocation: components[42] ? formatPersonLocation(components[42], encChars) : null,
    PriorTemporaryLocation: components[43] ? formatPersonLocation(components[43], encChars) : null,
    AdmitDateTime: components[44],
    DischargeDateTime: processRepeatableField(components[45], encChars),
    CurrentPatientBalance: components[46],
    TotalCharges: components[47],
    TotalAdjustments: components[48],
    TotalPayments: components[49],
    AlternateVisitID: components[50] ? formatCheckDigit(components[50], encChars) : null,
    VisitIndicator: components[51],
    OtherHealthcareProvider: processRepeatableField(components[52], encChars, formatPersonData),
  };
};

/**
 * GT1 - Guarantor
 * The GT1 segment contains guarantor (e.g., the person or the organization with financial responsibility for payment of a patient account) data for patient and insurance billing applications.
 * @param {*} segment
 */
const parseGT1Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetID: components[1],
    GuarantorNumber: processRepeatableField(components[2], encChars, formatCheckDigit),
    GuarantorName: processRepeatableField(components[3], encChars, formatPersonName),
    GuarantorSpouseName: processRepeatableField(components[4], encChars, formatPersonName),
    GuarantorAddress: processRepeatableField(components[5], encChars, formatAddress),
    GuarantorPhNumHome: processRepeatableField(components[6], encChars, formatTelecommunication),
    GuarantorPhNumBusiness: processRepeatableField(components[7], encChars, formatTelecommunication),
    GuarantorDateTimeOfBirth: components[8],
    GuarantorAdministrativeSex: components[9],
    GuarantorType: components[10],
    GuarantorRelationship: components[11] ? formatCodedElement(components[11], encChars) : null,
    GuarantorSSN: components[12],
    GuarantorDateBegin: components[13],
    GuarantorDateEnd: components[14],
    GuarantorPriority: components[15],
    GuarantorEmployerName: processRepeatableField(components[16], encChars, formatPersonName),
    GuarantorEmployerAddress: processRepeatableField(components[17], encChars, formatAddress),
    GuarantorEmployerPhoneNumber: processRepeatableField(components[18], encChars, formatTelecommunication),
    GuarantorEmployeeIDNumber: processRepeatableField(components[19], encChars, formatCheckDigit),
    GuarantorEmploymentStatus: components[20],
    GuarantorOrganizationName: processRepeatableField(components[21], encChars, formatOrganizations),
    GuarantorBillingHoldFlag: components[22],
    GuarantorCreditRatingCode: components[23] ? formatCodedElement(components[23], encChars) : null,
    GuarantorDeathDateAndTime: components[24],
    GuarantorDeathFlag: components[25],
    GuarantorChargeAdjustmentCode: components[26] ? formatCodedElement(components[26], encChars) : null,
    GuarantorHouseholdAnnualIncome: components[27] ? formatPrice(components[27], encChars) : null,
    GuarantorHouseholdSize: components[28],
    GuarantorEmployerIDNumber: processRepeatableField(components[29], encChars, formatCheckDigit),
    GuarantorMaritalStatusCode: components[30] ? formatCodedElement(components[30], encChars) : null,
    GuarantorHireEffectiveDate: components[31],
    EmploymentStopDate: components[32],
    LivingDependency: components[33],
    AmbulatoryStatus: processRepeatableField(components[34], encChars, formatCodedElement),
    Citizenship: processRepeatableField(components[35], encChars, formatCodedElement),
    PrimaryLanguage: components[36] ? formatCodedElement(components[36], encChars) : null,
    LivingArrangement: components[37],
    PublicityCode: components[38] ? formatCodedElement(components[38], encChars) : null,
    ProtectionIndicator: components[39],
    StudentIndicator: components[40],
    Religion: components[41] ? formatCodedElement(components[41], encChars) : null,
    MotherMaidenName: processRepeatableField(components[42], encChars, formatPersonName),
    Nationality: components[43] ? formatCodedElement(components[43], encChars) : null,
    EthnicGroup: processRepeatableField(components[44], encChars, formatCodedElement),
    ContactPersonName: processRepeatableField(components[45], encChars, formatPersonName),
    ContactPersonTelephoneNumber: processRepeatableField(components[46], encChars, formatTelecommunication),
    ContactReason: components[47] ? formatCodedElement(components[47], encChars) : null,
    ContactRelationship: components[48],
    JobTitle: components[49],
    JobCodeClass: components[50] ? formatJobCode(components[50], encChars) : null,
    GuarantorEmployerOrganizationName: processRepeatableField(components[51], encChars, formatOrganizations),
    Handicap: components[52],
    JobStatus: components[53],
    GuarantorFinancialClass: components[54] ? formatFinancialClass(components[54], encChars) : null,
    GuarantorRace: processRepeatableField(components[55], encChars, formatCodedElement),
    GuarantorBirthPlace: components[56],
    VIPIndicator: components[57],
  };
};

/**
 * IN1 - Insurance
 * The IN1 segment contains insurance policy coverage information necessary to produce properly pro-rated and patient and insurance bills.
 * @param {*} segment
 */
const parseIN1Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetID: components[1],
    InsurancePlanID: components[2] ? formatCodedElement(components[2], encChars) : null,
    InsuranceCompanyID: processRepeatableField(components[3], encChars, formatCheckDigit),
    InsuranceCompanyName: processRepeatableField(components[4], encChars, formatOrganizations),
    InsuranceCompanyAddress: processRepeatableField(components[5], encChars, formatAddress),
    InsuranceCoContactPerson: processRepeatableField(components[6], encChars, formatPersonName),
    InsuranceCoPhoneNumber: processRepeatableField(components[7], encChars, formatTelecommunication),
    GroupNumber: components[8],
    GroupName: processRepeatableField(components[9], encChars, formatOrganizations),
    InsuredGroupEmpID: processRepeatableField(components[10], encChars, formatCheckDigit),
    InsuredGroupEmpName: processRepeatableField(components[11], encChars, formatOrganizations),
    PlanEffectiveDate: components[12],
    PlanExpirationDate: components[13],
    AuthorizationInformation: components[14] ? formatAuthorizationInformation(components[14], encChars) : null,
    PlanType: components[15],
    NameOfInsured: processRepeatableField(components[16], encChars, formatPersonName),
    InsuredRelationshipToPatient: components[17] ? formatCodedElement(components[17], encChars) : null,
    InsuredDateOfBirth: components[18],
    InsuredAddress: processRepeatableField(components[19], encChars, formatAddress),
    AssignmentOfBenefits: components[20],
    CoordinationOfBenefits: components[21],
    CoordOfBenefitsPriority: components[22],
    NoticeOfAdmissionFlag: components[23],
    NoticeOfAdmissionDate: components[24],
    ReportOfEligibilityFlag: components[25],
    ReportOfEligibilityDate: components[26],
    ReleaseInformationCode: components[27],
    PreAdmitCert: components[28],
    VerificationDateTime: components[29],
    VerificationBy: processRepeatableField(components[30], encChars, formatPersonData),
    TypeOfAgreementCode: components[31],
    BillingStatus: components[32],
    LifetimeReserveDays: components[33],
    DelayBeforeLRDay: components[34],
    CompanyPlanCode: components[35],
    PolicyNumber: components[36],
    PolicyDeductible: components[37] ? formatPrice(components[37], encChars) : null,
    PolicyLimitAmount: components[38] ? formatPrice(components[38], encChars) : null,
    PolicyLimitDays: components[39],
    RoomRateSemiPrivate: components[40] ? formatPrice(components[40], encChars) : null,
    RoomRatePrivate: components[41] ? formatPrice(components[41], encChars) : null,
    InsuredEmploymentStatus: components[42] ? formatCodedElement(components[42], encChars) : null,
    InsuredAdministrativeSex: components[43],
    InsuredEmployerAddress: processRepeatableField(components[44], encChars, formatAddress),
    VerificationStatus: components[45],
    PriorInsurancePlanID: components[46],
    CoverageType: components[47],
    Handicap: components[48],
    InsuredIDNumber: processRepeatableField(components[49], encChars, formatCheckDigit),
    SignatureCode: components[50],
    SignatureCodeDate: components[51],
    InsuredBirthPlace: components[52],
    VIPIndicator: components[53],
  };
};

/**
 * IN2 - Insurance Additional Information
 * The IN2 segment contains additional insurance policy coverage and benefit information necessary for proper billing and reimbursement. Fields used by this segment are defined by CMS or other regulatory agencies.
 * @param {*} segment
 * @returns
 */
const parseIN2Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    InsuredEmployeeID: processRepeatableField(components[1], encChars, formatCheckDigit),
    InsuredSocialSecurityNumber: components[2],
    InsuredEmployerNameAndID: processRepeatableField(components[3], encChars, formatPersonData),
    EmployerInformationData: components[4],
    MailClaimParty: processRepeatableField(components[5], encChars),
    MedicareHealthInsCardNumber: components[6],
    MedicaidCaseName: processRepeatableField(components[7], encChars, formatPersonName),
    MedicaidCaseNumber: components[8],
    MilitarySponsorName: processRepeatableField(components[9], encChars, formatPersonName),
    MilitaryIDNumber: components[10],
    DependentOfMilitaryRecipient: components[11] ? formatCodedElement(components[11], encChars) : null,
    MilitaryOrganization: components[12],
    MilitaryStation: components[13],
    MilitaryService: components[14],
    MilitaryRankGrade: components[15],
    MilitaryStatus: components[16],
    MilitaryRetireDate: components[17],
    MilitaryNonAvailCertOnFile: components[18],
    BabyCoverage: components[19],
    CombineBabyBill: components[20],
    BloodDeductible: components[21],
    SpecialCoverageApprovalName: processRepeatableField(components[22], encChars, formatPersonName),
    SpecialCoverageApprovalTitle: components[23],
    NonCoveredInsuranceCode: processRepeatableField(components[24], encChars, formatCodedElement),
    PayorID: processRepeatableField(components[25], encChars, formatCheckDigit),
    PayorSubscriberID: processRepeatableField(components[26], encChars, formatCheckDigit),
    EligibilitySource: components[27],
    RoomCoverageTypeAmount: processRepeatableField(components[28], encChars, formatRoomCoverage),
    PolicyTypeAmount: processRepeatableField(components[29], encChars, formatPolicyTypeAmount),
    DailyDeductible: components[30] ? formatDailyDeductible(components[30], encChars) : null,
    LivingDependency: components[31],
    AmbulatoryStatus: processRepeatableField(components[32], encChars),
    Citizenship: processRepeatableField(components[33], encChars, formatCodedElement),
    PrimaryLanguage: components[34] ? formatCodedElement(components[34], encChars) : null,
    LivingArrangement: components[35],
    PublicityCode: components[36] ? formatCodedElement(components[36], encChars) : null,
    ProtectionIndicator: components[37],
    StudentIndicator: components[38],
    Religion: components[39] ? formatCodedElement(components[39], encChars) : null,
    MothersMaidenName: processRepeatableField(components[40], encChars, formatPersonName),
    Nationality: components[41] ? formatCodedElement(components[41], encChars) : null,
    EthnicGroup: processRepeatableField(components[42], encChars, formatCodedElement),
    MaritalStatus: processRepeatableField(components[43], encChars, formatCodedElement),
    InsuredEmploymentStartDate: components[44],
    EmploymentStopDate: components[45],
    JobTitle: components[46],
    JobCodeClass: components[47] ? formatJobCode(components[47], encChars) : null,
    JobStatus: components[48],
    EmployerContactPersonName: processRepeatableField(components[49], encChars, formatPersonName),
    EmployerContactPersonPhoneNumber: processRepeatableField(components[50], encChars, formatTelecommunication),
    EmployerContactReason: components[51],
    InsuredContactPersonName: processRepeatableField(components[52], encChars, formatPersonName),
    InsuredContactPersonPhoneNumber: processRepeatableField(components[53], encChars, formatTelecommunication),
    InsuredContactPersonReason: processRepeatableField(components[54], encChars),
    RelationshipToPatientStartDate: components[55],
    RelationshipToPatientStopDate: processRepeatableField(components[56], encChars),
    InsuranceCoContactReason: components[57],
    InsuranceCoContactPhoneNumber: components[58] ? formatTelecommunication(components[58], encChars) : null,
    PolicyScope: components[59],
    PolicySource: components[60],
    PatientMemberNumber: components[61] ? formatCheckDigit(components[61], encChars) : null,
    GuarantorsRelationshipToInsured: components[62] ? formatCodedElement(components[62], encChars) : null,
    InsuredPhoneNumberHome: processRepeatableField(components[63], encChars, formatTelecommunication),
    InsuredEmployerPhoneNumber: processRepeatableField(components[64], encChars, formatTelecommunication),
    MilitaryHandicappedProgram: components[65] ? formatCodedElement(components[65], encChars) : null,
    SuspendFlag: components[66],
    CopayLimitFlag: components[67],
    StoplossLimitFlag: components[68],
    InsuredOrganizationNameAndID: processRepeatableField(components[69], encChars, formatOrganizations),
    InsuredEmployerOrganizationNameAndID: processRepeatableField(components[70], encChars, formatOrganizations),
    Race: processRepeatableField(components[71], encChars, formatCodedElement),
    CMSPatientsRelationshipToInsured: components[72] ? formatCodedElement(components[72], encChars) : null,
  };
};

/**
 * IN3 - Insurance Additional Information, Certification
 * The IN3 segment contains additional insurance information for certifying the need for patient care. Fields used by this segment are defined by CMS, or other regulatory agencies.
 * @param {*} segment
 * @returns
 */
const parseIN3Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetIDIN3: components[1],
    CertificationNumber: components[2] ? formatCheckDigit(components[2], encChars) : null,
    CertifiedBy: processRepeatableField(components[3], encChars, formatPersonData),
    CertificationRequired: components[4],
    Penalty: components[5] ? formatMoneyOrPercentage(components[5], encChars) : null,
    CertificationDateTime: components[6],
    CertificationModifyDateTime: components[7],
    Operator: processRepeatableField(components[8], encChars, formatPersonData),
    CertificationBeginDate: components[9],
    CertificationEndDate: components[10],
    Days: components[11] ? formatDayTypeAndNumber(components[11], encChars) : null,
    NonConcurCodeDescription: components[12] ? formatCodedElement(components[12], encChars) : null,
    NonConcurEffectiveDateTime: components[13],
    PhysicianReviewer: processRepeatableField(components[14], encChars, formatPersonData),
    CertificationContact: components[15],
    CertificationContactPhoneNumber: processRepeatableField(components[16], encChars, formatTelecommunication),
    AppealReason: components[17] ? formatCodedElement(components[17], encChars) : null,
    CertificationAgency: components[18] ? formatCodedElement(components[18], encChars) : null,
    CertificationAgencyPhoneNumber: processRepeatableField(components[19], encChars, formatTelecommunication),
    PreCertificationRequirement: processRepeatableField(
      components[20],
      encChars,
      formatInsuranceCertificationDefinition,
    ),
    CaseManager: components[21],
    SecondOpinionDate: components[22],
    SecondOpinionStatus: components[23],
    SecondOpinionDocumentationReceived: processRepeatableField(components[24], encChars),
    SecondOpinionPhysician: processRepeatableField(components[25], encChars, formatPersonData),
  };
};

/**
 * DG1 - Diagnosis
 * The DG1 segment contains patient diagnosis information of various types, for example, admitting, primary, etc. The DG1 segment is used to send multiple diagnoses (for example, for medical records encoding). It is also used when the FT1-19 - Diagnosis Code - FT1 does not provide sufficient information for a billing system. This diagnosis coding should be distinguished from the clinical problem segment used by caregivers to manage the patient (see Chapter 12, Patient Care). Coding methodologies are also defined.
 * @param {*} segment
 * @returns
 */
const parseDG1Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetID: components[1],
    DiagnosisCodingMethod: components[2],
    DiagnosisCode: components[3] ? formatCodedElement(components[3], encChars) : null,
    DiagnosisDescription: components[4],
    DiagnosisDateTime: components[5],
    DiagnosisType: components[6],
    MajorDiagnosticCategory: components[7] ? formatCodedElement(components[7], encChars) : null,
    DiagnosticRelatedGroup: components[8] ? formatCodedElement(components[8], encChars) : null,
    DRGApprovalIndicator: components[9],
    DRGGrouperReviewCode: components[10],
    OutlierType: components[11] ? formatCodedElement(components[11], encChars) : null,
    OutlierDays: components[12],
    OutlierCost: components[13] ? formatPrice(components[13], encChars) : null,
    GrouperVersionAndType: components[14],
    DiagnosisPriority: components[15],
    DiagnosingClinician: processRepeatableField(components[16], encChars, formatPersonData),
    DiagnosisClassification: components[17],
    ConfidentialIndicator: components[18],
    AttestationDateTime: components[19],
    DiagnosisIdentifier: components[20] ? formatEntityIdentifier(components[20], encChars) : null,
    DiagnosisActionCode: components[21],
  };
};

/**
 * SCH - Scheduling Activity Information
 * The SCH segment contains general information about the scheduled appointment.
 * @param {*} segment
 * @returns
 */
const parseSCHSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    PlacerAppointmentID: components[1] ? formatEntityIdentifier(components[1], encChars) : null,
    FillerAppointmentID: components[2] ? formatEntityIdentifier(components[2], encChars) : null,
    OccurrenceNumber: components[3],
    PlacerGroupNumber: components[4] ? formatEntityIdentifier(components[4], encChars) : null,
    ScheduleID: components[5] ? formatCodedElement(components[5], encChars) : null,
    EventReason: components[6] ? formatCodedElement(components[6], encChars) : null,
    AppointmentReason: components[7] ? formatCodedElement(components[7], encChars) : null,
    AppointmentType: components[8] ? formatCodedElement(components[8], encChars) : null,
    AppointmentDuration: components[9],
    AppointmentDurationUnits: components[10] ? formatCodedElement(components[10], encChars) : null,
    AppointmentTimingQuantity: processRepeatableField(components[11], encChars, formatTimingQuantity),
    PlacerContactPerson: processRepeatableField(components[12], encChars, formatPersonData),
    PlacerContactPhoneNumber: components[13] ? formatTelecommunication(components[13], encChars) : null,
    PlacerContactAddress: processRepeatableField(components[14], encChars, formatAddress),
    PlacerContactLocation: components[15] ? formatPersonLocation(components[15], encChars) : null,
    FillerContactPerson: processRepeatableField(components[16], encChars, formatPersonData),
    FillerContactPhoneNumber: components[17] ? formatTelecommunication(components[17], encChars) : null,
    FillerContactAddress: processRepeatableField(components[18], encChars, formatAddress),
    FillerContactLocation: components[19] ? formatPersonLocation(components[19], encChars) : null,
    EnteredByPerson: processRepeatableField(components[20], encChars, formatPersonData),
    EnteredByPhoneNumber: processRepeatableField(components[21], encChars, formatTelecommunication),
    EnteredByLocation: components[22] ? formatPersonLocation(components[22], encChars) : null,
    ParentPlacerAppointmentID: components[23] ? formatEntityIdentifier(components[23], encChars) : null,
    ParentFillerAppointmentID: components[24] ? formatEntityIdentifier(components[24], encChars) : null,
    FillerStatusCode: components[25] ? formatCodedElement(components[25], encChars) : null,
    PlacerOrderNumber: processRepeatableField(components[26], encChars, formatEntityIdentifier),
    FillerOrderNumber: processRepeatableField(components[27], encChars, formatEntityIdentifier),
  };
};

/**
 * RGS - Resource Group
 * The RGS segment is used to identify relationships between resources identified for a scheduled event. This segment can be used, on a site specified basis, to identify groups of resources that are used together within a scheduled event, or to describe some other relationship between resources. To specify related groups of resources within a message, begin each group with an RGS segment, and then follow that RGS with one or more of the Appointment Information segments (AIG, AIL, AIS, or AIP).
 * If a message does not require any grouping of resources, then specify a single RGS in the message, and follow it with all of the Appointment Information segments for the scheduled event. (At least one RGS segment is required in each message – even if no grouping of resources is required – to allow parsers to properly understand the message.)
 * @param {*} segment
 * @returns
 */
const parseRGSSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    SetIDRGS: components[1],
    SegmentActionCode: components[2],
    ResourceGroupID: components[3] ? formatCodedElement(components[3], encChars) : null,
  };
};

/**
 * AIG - Appointment Information - General Resource
 * The AIG segment contains information about various kinds of resources (other than those with specifically defined segments in this chapter) that can be scheduled. Resources included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application. Resources not controlled by a schedule are not identified on a schedule request using this segment. Resources described by this segment are general kinds of resources, such as equipment, that are identified with a simple identification code.
 * @param {*} segment
 * @returns
 */
const parseAIGSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    SetIDAIG: components[1],
    SegmentActionCode: components[2],
    ResourceID: components[3] ? formatCodedElement(components[3], encChars) : null,
    ResourceType: components[4] ? formatCodedElement(components[4], encChars) : null,
    ResourceGroup: processRepeatableField(components[5], encChars, formatCodedElement),
    ResourceQuantity: components[6],
    ResourceQuantityUnits: components[7] ? formatCodedElement(components[7], encChars) : null,
    StartDateTime: components[8],
    StartDateTimeOffset: components[9],
    StartDateTimeOffsetUnits: components[10] ? formatCodedElement(components[10], encChars) : null,
    Duration: components[11],
    DurationUnits: components[12] ? formatCodedElement(components[12], encChars) : null,
    AllowSubstitutionCode: components[13],
    FillerStatusCode: components[14] ? formatCodedElement(components[14], encChars) : null,
  };
};

/**
 * AIL - Appointment Information - Location Resource
 * The AIL segment contains information about location resources (meeting rooms, operating rooms, examination rooms, or other locations) that can be scheduled. Resources included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application. Resources not controlled by a schedule are not identified on a schedule request using this segment. Location resources are identified with this specific segment because of the specific encoding of locations used by the HL7 specification.
 * @param {*} segment
 * @returns
 */
const parseAILSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    SetIDAIL: components[1],
    SegmentActionCode: components[2],
    LocationResourceID: processRepeatableField(components[3], encChars, formatPersonLocation),
    LocationTypeAIL: components[4] ? formatCodedElement(components[4], encChars) : null,
    LocationGroup: components[5] ? formatCodedElement(components[5], encChars) : null,
    StartDateTime: components[6],
    StartDateTimeOffset: components[7],
    StartDateTimeOffsetUnits: components[8] ? formatCodedElement(components[8], encChars) : null,
    Duration: components[9],
    DurationUnits: components[10] ? formatCodedElement(components[10], encChars) : null,
    AllowSubstitutionCode: components[11],
    FillerStatusCode: components[12] ? formatCodedElement(components[12], encChars) : null,
  };
};

/**
 * AIP - Appointment Information - Personnel Resource
 * The AIP segment contains information about the personnel types that can be scheduled. Personnel included in a transaction using this segment are assumed to be controlled by a schedule on a schedule filler application. Personnel not controlled by a schedule are not identified on a schedule request using this segment. The kinds of personnel described on this segment include any healthcare provider in the institution controlled by a schedule (for example: technicians, physicians, nurses, surgeons, anesthesiologists, or CRNAs).
 * @param {*} segment
 * @returns
 */
const parseAIPSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    SetIDAIP: components[1],
    SegmentActionCode: components[2],
    PersonnelResourceID: processRepeatableField(components[3], encChars, formatPersonData),
    ResourceType: components[4] ? formatCodedElement(components[4], encChars) : null,
    ResourceGroup: components[5] ? formatCodedElement(components[5], encChars) : null,
    StartDateTime: components[6],
    StartDateTimeOffset: components[7],
    StartDateTimeOffsetUnits: components[8] ? formatCodedElement(components[8], encChars) : null,
    Duration: components[9],
    DurationUnits: components[10] ? formatCodedElement(components[10], encChars) : null,
    AllowSubstitutionCode: components[11],
    FillerStatusCode: components[12] ? formatCodedElement(components[12], encChars) : null,
  };
};

/**
 * FT1 - Financial Transaction
 * The FT1 segment contains the detail data necessary to post charges, payments, adjustments, etc. to patient accounting records.
 * @param {*} segment
 * @returns
 */
const parseFT1Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    SetIDFT1: components[1],
    TransactionID: components[2],
    TransactionBatchID: components[3],
    TransactionDate: components[4],
    TransactionPostingDate: components[5],
    TransactionType: components[6],
    TransactionCode: components[7] ? formatCodedElement(components[7], encChars) : null,
    TransactionDescription: components[8],
    TransactionDescriptionAlt: components[9],
    TransactionQuantity: components[10],
    TransactionAmountExtended: components[11] ? formatPrice(components[11], encChars) : null,
    TransactionAmountUnit: components[12] ? formatPrice(components[12], encChars) : null,
    DepartmentCode: components[13] ? formatCodedElement(components[13], encChars) : null,
    InsurancePlanID: components[14] ? formatCodedElement(components[14], encChars) : null,
    InsuranceAmount: components[15] ? formatPrice(components[15], encChars) : null,
    AssignedPatientLocation: components[16] ? formatPersonLocation(components[16], encChars) : null,
    FeeSchedule: components[17],
    PatientType: components[18],
    DiagnosisCodeFT1: processRepeatableField(components[19], encChars, formatCodedElement),
    PerformedByCode: processRepeatableField(components[20], encChars, formatPersonData),
    OrderedByCode: processRepeatableField(components[21], encChars, formatPersonData),
    UnitCost: components[22] ? formatPrice(components[22], encChars) : null,
    FillerOrderNumber: components[23] ? formatEntityIdentifier(components[23], encChars) : null,
    EnteredByCode: processRepeatableField(components[24], encChars, formatPersonData),
    ProcedureCode: components[25] ? formatCodedElement(components[25], encChars) : null,
    ProcedureCodeModifier: processRepeatableField(components[26], encChars, formatCodedElement),
    AdvancedBeneficiaryNoticeCode: components[27] ? formatCodedElement(components[27], encChars) : null,
    MedicallyNecessaryDuplicateProcedureReason: components[28] ? formatCodedElement(components[28], encChars) : null,
    NDCCode: components[29] ? formatCodedElementWithNoExceptions(components[29], encChars) : null,
    PaymentReferenceID: components[30] ? formatCheckDigit(components[30], encChars) : null,
    TransactionReferenceKey: processRepeatableField(components[31], encChars),
  };
};

/**
 * PR1 - Procedures
 * The PR1 segment contains information relative to various types of procedures that can be performed on a patient. The PR1 segment can be used to send procedure information, for example: Surgical, Nuclear Medicine, X-ray with contrast, etc. The PR1 segment is used to send multiple procedures, for example, for medical records encoding or for billing systems.
 * @param {*} segment
 * @returns
 */
const parsePR1Segment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetID: components[1],
    ProcedureCodingMethod: components[2],
    ProcedureCode: components[3] ? formatCodedElement(components[3], encChars) : null,
    ProcedureDescription: components[4],
    ProcedureDateTime: components[5],
    ProcedureFunctionalType: components[6],
    ProcedureMinutes: components[7],
    Anesthesiologist: processRepeatableField(components[8], encChars, formatPersonData),
    AnesthesiaCode: components[9],
    AnesthesiaMinutes: components[10],
    Surgeon: processRepeatableField(components[11], encChars, formatPersonData),
    ProcedurePractitioner: processRepeatableField(components[12], encChars, formatPersonData),
    ConsentCode: components[13] ? formatCodedElement(components[13], encChars) : null,
    ProcedurePriority: components[14],
    AssociatedDiagnosisCode: components[15] ? formatCodedElement(components[15], encChars) : null,
    ProcedureCodeModifier: processRepeatableField(components[16], encChars, formatCodedElement),
    ProcedureDRGType: components[17],
    TissueTypeCode: processRepeatableField(components[18], encChars, formatCodedElement),
    ProcedureIdentifier: components[19] ? formatEntityIdentifier(components[19], encChars) : null,
    ProcedureActionCode: components[20],
  };
};

/**
 * ROL - Role
 * The role segment contains the data necessary to add, update, correct, and delete from the record persons involved, as well as their functional involvement with the activity being transmitted.
 * @param {*} segment
 * @returns
 */
const parseROLSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    RoleInstanceID: components[1] ? formatEntityIdentifier(components[1], encChars) : null,
    ActionCode: components[2],
    RoleROL: components[3] ? formatCodedElement(components[3], encChars) : null,
    RolePerson: processRepeatableField(components[4], encChars, formatPersonData),
    RoleBeginDateTime: components[5],
    RoleEndDateTime: components[6],
    RoleDuration: components[7] ? formatCodedElement(components[7], encChars) : null,
    RoleActionReason: components[8] ? formatCodedElement(components[8], encChars) : null,
    ProviderType: processRepeatableField(components[9], encChars, formatCodedElement),
    OrganizationUnitType: components[10] ? formatCodedElement(components[10], encChars) : null,
    OfficeHomeAddressBirthplace: processRepeatableField(components[11], encChars, formatAddress),
    Phone: processRepeatableField(components[12], encChars, formatTelecommunication),
  };
};

/**
 * QRD - Original-Style Query Definition
 * This segment is not carried forward to the recommended queries for v 2.4.
 * The QRD segment is used to define a query.
 * @param {*} segment
 * @returns
 */
const parseQRDSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    QueryDateTime: components[1],
    QueryFormatCode: components[2],
    QueryPriority: components[3],
    QueryID: components[4],
    DeferredResponseType: components[5],
    DeferredResponseDateTime: components[6],
    QuantityLimitedRequest: components[7] ? formatCompositeQuantity(components[7], encChars) : null,
    WhoSubjectFilter: processRepeatableField(components[8], encChars, formatPersonData),
    WhatSubjectFilter: processRepeatableField(components[9], encChars, formatCodedElement),
    WhatDepartmentDataCode: processRepeatableField(components[10], encChars, formatCodedElement),
    WhatDataCodeValueQual: processRepeatableField(components[11], encChars),
    QueryResultsLevel: components[12],
  };
};

/**
 * MSA - Message Acknowledgment
 * The MSA segment contains information sent while acknowledging another message.
 * @param {*} segment
 * @returns
 */
const parseMSASegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    AcknowledgmentCode: components[1],
    MessageControlID: components[2],
    TextMessage: components[3],
    ExpectedSequenceNumber: components[4],
    DelayedAcknowledgmentType: components[5],
    ErrorCondition: components[6] ? formatCodedElement(components[6], encChars) : null,
  };
};

/**
 * MFI - Master File Identification
 * The Technical Steward for the MFI segment is CQ.
 * @param {*} segment
 * @returns
 */
const parseMFISegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    MasterFileIdentifier: formatCodedElement(components[1], encChars),
    MasterFileApplicationIdentifier: components[2] ? formatHierarchicDesignator(components[2], encChars) : null,
    FileLevelEventCode: components[3],
    EnteredDateTime: components[4],
    EffectiveDateTime: components[5],
    ResponseLevelCode: components[6],
  };
};

/**
 * MFE - Master File Entry
 * The Technical Steward for the MFE segment is CQ.
 * @param {*} segment
 * @returns
 */
const parseMFESegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  return {
    RecordLevelEventCode: components[1],
    MFNControlID: components[2],
    EffectiveDateTime: components[3],
    PrimaryKeyValues: parsePrimaryKeyValues(components[4], encChars),
    PrimaryKeyValueType: components[5],
  };
};

/**
 * STF - Staff Identification
 * The STF segment can identify any personnel referenced by information systems. These can be providers, staff, system users, and referring agents. In a network environment, this segment can be used to define personnel to other applications; for example, order entry clerks, insurance verification clerks, admission clerks, as well as provider demographics. When using the STF and PRA segments in the Staff/Practitioner Master File message, MFE-4-primary key value is used to link all the segments pertaining to the same master file entry. Therefore, in the MFE segment, MFE-4-primary key value must be filled in. Other segments may follow the STF segment to provide data for a particular type of staff member. The PRA segment (practitioner) is one such. It may optionally follow the STF segment in order to add practitionerspecific data. Other segments may be defined as needed. When using the segments included in this chapter for other then Staff/Practitioner Master File messages, disregard references to MFE-4 - primary key value.
 * @param {*} segment
 */
const parseSTFSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    PrimaryKeyValueSTF: formatCodedElement(components[1], encChars),
    StaffIdentifierList: processRepeatableField(components[2], encChars, formatCheckDigit),
    StaffName: processRepeatableField(components[3], encChars, formatPersonName),
    StaffType: processRepeatableField(components[4], encChars),
    AdministrativeSex: components[5],
    DateTimeOfBirth: components[6],
    ActiveInactiveFlag: components[7],
    Department: processRepeatableField(components[8], encChars, formatCodedElement),
    HospitalServiceSTF: processRepeatableField(components[9], encChars, formatCodedElement),
    Phone: processRepeatableField(components[10], encChars, formatTelecommunication),
    OfficeHomeAddressBirthplace: processRepeatableField(components[11], encChars, formatAddress),
    InstitutionActivationDate: processRepeatableField(components[12], encChars, formatDIN),
    InstitutionInactivationDate: processRepeatableField(components[13], encChars, formatDIN),
    BackupPersonID: processRepeatableField(components[14], encChars, formatCodedElement),
    EmailAddress: processRepeatableField(components[15], encChars),
    PreferredMethodOfContact: components[16] ? formatCodedElement(components[16], encChars) : null,
    MaritalStatus: components[17] ? formatCodedElement(components[17], encChars) : null,
    JobTitle: components[18],
    JobCodeClass: components[19] ? formatJobCode(components[19], encChars) : null,
    EmploymentStatusCode: components[20] ? formatCodedElement(components[20], encChars) : null,
    AdditionalInsuredOnAuto: components[21],
    DriverLicenseNumberStaff: components[22] ? formatDriverLicenseNumber(components[22], encChars) : null,
    CopyAutoIns: components[23],
    AutoInsExpires: components[24],
    DateLastDMVReview: components[25],
    DateNextDMVReview: components[26],
    Race: components[27] ? formatCodedElement(components[27], encChars) : null,
    EthnicGroup: components[28] ? formatCodedElement(components[28], encChars) : null,
    ReActivationApprovalIndicator: components[29],
    Citizenship: processRepeatableField(components[30], encChars, formatCodedElementWithNoExceptions),
    DeathDateTime: components[31],
    DeathIndicator: components[32],
    InstitutionRelationshipTypeCode: components[33]
      ? formatCodedElementWithNoExceptions(components[33], encChars)
      : null,
    InstitutionRelationshipPeriod: components[34],
    ExpectedReturnDate: components[35],
    CostCenterCode: processRepeatableField(components[36], encChars, formatCodedElementWithNoExceptions),
    GenericClassificationIndicator: components[37],
    InactiveReasonCode: components[38] ? formatCodedElementWithNoExceptions(components[38], encChars) : null,
  };
};

/**
 * PRA - Practitioner Detail
 * The PRA segment adds detailed medical practitioner information to the personnel identified by the STF segment. A PRA segment may optionally follow an STF segment. A PRA segment must always have been preceded by a corresponding STF segment. The PRA segment may also be used for staff who work in healthcare who are not practitioners, but need to be certified, e.g., “medical records staff.”
 * @param {*} segment
 */
const parsePRASegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    PrimaryKeyValue: components[1] ? formatCodedElement(components[1], encChars) : null,
    PractitionerGroup: processRepeatableField(components[2], encChars, formatCodedElement),
    PractitionerCategory: processRepeatableField(components[3], encChars),
    ProviderBilling: components[4],
    Specialty: processRepeatableField(components[5], encChars, formatSPD),
    PractitionerIDNumbers: processRepeatableField(components[6], encChars, formatPLN),
    Privileges: processRepeatableField(components[7], encChars, formatPIP),
    DateEnteredPractice: components[8],
    Institution: components[9] ? formatCodedElement(components[9], encChars) : null,
    DateLeftPractice: components[10],
    GovernmentReimbursementBillingEligibility: processRepeatableField(components[11], encChars, formatCodedElement),
    SetIDPRA: components[12],
  };
};

/**
 * ORC - Common Order
 * The Common Order segment (ORC) is used to transmit fields that are common to all orders (all types of services that are requested). The ORC segment is required in the Order (ORM) message. ORC is mandatory in Order Acknowledgment (ORR) messages if an order detail segment is present, but is not required otherwise.
 * If details are needed for a particular type of order segment (e.g., Pharmacy, Dietary), the ORC must precede any order detail segment (e.g., RXO, ODS). In some cases, the ORC may be as simple as the string ORC|OK|<placer order number>|<filler order number>|<cr>.
 * If details are not needed for the order, the order detail segment may be omitted. For example, to place an order on hold, one would transmit an ORC with the following fields completed: ORC-1-order control with a value of HD, ORC-2-placer order number, and ORC-3-filler order number.
 * @param {*} segment
 */
const parseORCSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    OrderControl: components[1],
    PlacerOrderNumber: components[2] ? formatEntityIdentifier(components[2], encChars) : null,
    FillerOrderNumber: components[3] ? formatEntityIdentifier(components[3], encChars) : null,
    PlacerGroupNumber: components[4] ? formatEntityIdentifier(components[4], encChars) : null,
    OrderStatus: components[5],
    ResponseFlag: components[6],
    QuantityTiming: processRepeatableField(components[7], encChars, formatTimingQuantity),
    ParentOrder: components[8] ? formatEIP(components[8]) : null,
    DateTimeOfTransaction: components[9],
    EnteredBy: processRepeatableField(components[10], encChars, formatPersonData),
    VerifiedBy: processRepeatableField(components[11], encChars, formatPersonData),
    OrderingProvider: processRepeatableField(components[12], encChars, formatPersonData),
    EnterersLocation: components[13] ? formatPersonLocation(components[13], encChars) : null,
    CallBackPhoneNumber: processRepeatableField(components[14], encChars, formatTelecommunication),
    OrderEffectiveDateTime: components[15],
    OrderControlCodeReason: components[16] ? formatCodedElement(components[16], encChars) : null,
    EnteringOrganization: components[17] ? formatCodedElement(components[17], encChars) : null,
    EnteringDevice: components[18] ? formatCodedElement(components[18], encChars) : null,
    ActionBy: processRepeatableField(components[19], encChars, formatPersonData),
    AdvancedBeneficiaryNoticeCode: components[20] ? formatCodedElement(components[20], encChars) : null,
    OrderingFacilityName: processRepeatableField(components[21], encChars, formatOrganizations),
    OrderingFacilityAddress: processRepeatableField(components[22], encChars, formatAddress),
    OrderingFacilityPhoneNumber: processRepeatableField(components[23], encChars, formatTelecommunication),
    OrderingProviderAddress: processRepeatableField(components[24], encChars, formatAddress),
    OrderStatusModifier: components[25] ? formatCodedElementWithNoExceptions(components[25], encChars) : null,
    AdvancedBeneficiaryNoticeOverrideReason: components[26]
      ? formatCodedElementWithNoExceptions(components[26], encChars)
      : null,
    FillersExpectedAvailabilityDateTime: components[27],
    ConfidentialityCode: components[28] ? formatCodedElementWithNoExceptions(components[28], encChars) : null,
    OrderType: components[29] ? formatCodedElementWithNoExceptions(components[29], encChars) : null,
    EntererAuthorizationMode: components[30] ? formatCodedElementWithNoExceptions(components[30], encChars) : null,
  };
};

/**
 * OBR - Observation Request
 * The Observation Request (OBR) segment is used to transmit information specific to an order for a diagnostic study or observation, physical exam, or assessment.
 * @param {*} segment
 * @returns
 */
const parseOBRSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetIDOBR: components[1],
    PlacerOrderNumber: components[2] ? formatEntityIdentifier(components[2], encChars) : null,
    FillerOrderNumber: components[3] ? formatEntityIdentifier(components[3], encChars) : null,
    UniversalServiceIdentifier: components[4] ? formatCodedElement(components[4], encChars) : null,
    PriorityOBR: components[5],
    RequestedDateTime: components[6],
    ObservationDateTime: components[7],
    ObservationEndDateTime: components[8],
    CollectionVolume: components[9] ? formatCompositeQuantity(components[9], encChars) : null,
    CollectorIdentifier: processRepeatableField(components[10], encChars, formatPersonData),
    SpecimenActionCode: components[11],
    DangerCode: components[12] ? formatCodedElement(components[12], encChars) : null,
    RelevantClinicalInformation: components[13],
    SpecimenReceivedDateTime: components[14],
    SpecimenSource: components[15] ? formatSPS(components[15], encChars) : null,
    OrderingProvider: processRepeatableField(components[16], encChars, formatPersonData),
    OrderCallbackPhoneNumber: processRepeatableField(components[17], encChars, formatTelecommunication),
    PlacerField1: components[18],
    PlacerField2: components[19],
    FillerField1: components[20],
    FillerField2: components[21],
    ResultsRptStatusChngDateTime: components[22],
    ChargeToPractice: components[23] ? formatMOC(components[23], encChars) : null,
    DiagnosticServSectID: components[24],
    ResultStatus: components[25],
    ParentResult: components[26] ? formatPRL(components[26], encChars) : null,
    QuantityTiming: processRepeatableField(components[27], encChars, formatTimingQuantity),
    ResultCopiesTo: processRepeatableField(components[28], encChars, formatPersonName),
    Parent: components[29] ? formatEIP(components[29], encChars) : null,
    TransportationMode: components[30],
    ReasonForStudy: processRepeatableField(components[31], encChars, formatCodedElement),
    PrincipalResultInterpreter: components[32] ? formatNDL(components[32], encChars) : null,
    AssistantResultInterpreter: processRepeatableField(components[33], encChars, formatNDL),
    Technician: processRepeatableField(components[34], encChars, formatNDL),
    Transcriptionist: processRepeatableField(components[35], encChars, formatNDL),
    ScheduledDateTime: components[36],
    NumberOfSampleContainers: components[37],
    TransportLogisticsOfCollectedSample: processRepeatableField(components[38], encChars, formatCodedElement),
    CollectorComment: processRepeatableField(components[39], encChars, formatCodedElement),
    TransportArrangementResponsibility: components[40] ? formatCodedElement(components[40], encChars) : null,
    TransportArranged: components[41],
    EscortRequired: components[42],
    PlannedPatientTransportComment: processRepeatableField(components[43], encChars, formatCodedElement),
    ProcedureCode: components[44] ? formatCodedElement(components[44], encChars) : null,
    ProcedureCodeModifier: processRepeatableField(components[45], encChars, formatCodedElement),
    PlacerSupplementalServiceInformation: processRepeatableField(components[46], encChars, formatCodedElement),
    FillerSupplementalServiceInformation: processRepeatableField(components[47], encChars, formatCodedElement),
    MedicallyNecessaryDuplicateProcedureReason: components[48]
      ? formatCodedElementWithNoExceptions(components[48], encChars)
      : null,
    ResultHandling: components[49],
  };
};

/**
 * OBX - Observation/Result
 * The OBX segment is used to transmit a single observation or observation fragment. It represents the smallest indivisible unit of a report. The OBX segment can also contain encapsulated data, e.g., a CDA document or a DICOM image.
 * Its principal mission is to carry information about observations in report messages. But the OBX can also be part of an observation order. In this case, the OBX carries clinical information needed by the filler to interpret the observation the filler makes. For example, an OBX is needed to report the inspired oxygen on an order for a blood oxygen to a blood gas lab, or to report the menstrual phase information which should be included on an order for a pap smear to a cytology lab. Appendix 7A includes codes for identifying many of pieces of information needed by observation producing services to properly interpret a test result. OBX is also found in other HL7 messages that need to include patient clinical information.
 * @param {*} segment
 * @returns
 */
const parseOBXSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);

  return {
    SetIDOBX: components[1],
    ValueType: components[2],
    ObservationIdentifier: components[3] ? formatCodedElement(components[3], encChars) : null,
    ObservationSubID: components[4],
    ObservationValue: processRepeatableField(components[5], encChars),
    Units: components[6] ? formatCodedElement(components[6], encChars) : null,
    ReferencesRange: components[7],
    AbnormalFlags: processRepeatableField(components[8], encChars),
    Probability: components[9],
    NatureOfAbnormalTest: processRepeatableField(components[10], encChars),
    ObservationResultStatus: components[11],
    EffectiveDateOfReferenceRange: components[12],
    UserDefinedAccessChecks: components[13],
    DateTimeOfObservation: components[14],
    ProducerID: components[15] ? formatCodedElement(components[15], encChars) : null,
    ResponsibleObserver: processRepeatableField(components[16], encChars, formatPersonData),
    ObservationMethod: processRepeatableField(components[17], encChars, formatCodedElement),
    EquipmentInstanceIdentifier: processRepeatableField(components[18], encChars, formatEntityIdentifier),
    DateTimeOfAnalysis: components[19],
  };
};

const parseOtherSegment = (segment, separator, encChars) => {
  const components = segment.split(separator);
  const segmentObj = {};

  const handleSubComponent = (subComponent, parentObj, key) => {
    if (subComponent.includes(encChars[3])) {
      const subSubComponents = subComponent.split(encChars[3]);
      parentObj[key] = {};
      subSubComponents.forEach((subSubComponent, subSubIndex) => {
        parentObj[key][`${key}.${subSubIndex + 1}`] = subSubComponent;
      });
    } else if (subComponent.includes('&')) {
      const subSubComponents = subComponent.split('&');
      parentObj[key] = {};
      subSubComponents.forEach((subSubComponent, subSubIndex) => {
        parentObj[key][`${key}.${subSubIndex + 1}`] = subSubComponent;
      });
    } else {
      parentObj[key] = subComponent;
    }
  };

  const handleComponent = (component, parentObj, key) => {
    if (component.includes(encChars[0])) {
      const subComponents = component.split(encChars[0]);
      parentObj[key] = {};
      subComponents.forEach((subComponent, subIndex) => {
        handleSubComponent(subComponent, parentObj[key], `${key}.${subIndex + 1}`);
      });
    } else {
      handleSubComponent(component, parentObj, key);
    }
  };

  for (let index = 1; index < components.length; index++) {
    const component = components[index];
    const key = `${components[0]}.${index}`;

    if (component.includes(encChars[1])) {
      processRepeatableField(handleComponent(component, segmentObj, key), encChars);
    } else {
      handleComponent(component, segmentObj, key);
    }
  }

  return segmentObj;
};

const parseHL7Message = (hl7Message) => {
  const segments = hl7Message.trim().split('\n');
  const mshSegment = segments.find((segment) => segment.startsWith('MSH'));
  const separator = mshSegment[3] || `|`;
  const encChars = mshSegment.split(separator)[1] || `^~\\&`;
  const parsedMessage = {};

  segments.forEach((segment) => {
    const segmentType = segment.split(separator)[0];

    if (parsedMessage[segmentType]) {
      if (Array.isArray(parsedMessage[segmentType])) {
        parsedMessage[segmentType].push(parseSegment(segmentType, segment, separator, encChars));
      } else {
        parsedMessage[segmentType] = [
          parsedMessage[segmentType],
          parseSegment(segmentType, segment, separator, encChars),
        ];
      }
    } else {
      parsedMessage[segmentType] = parseSegment(segmentType, segment, separator, encChars);
    }
  });

  return parsedMessage; // parse as pretty JSON
};

const parseSegment = (segmentType, segment, separator, encChars) => {
  switch (segmentType) {
    case 'MSH':
      return parseMSHSegment(segment, separator, encChars);
    case 'EVN':
      return parseEVNSegment(segment, separator, encChars);
    case 'PID':
      return parsePIDSegment(segment, separator, encChars);
    case 'PV1':
      return parsePV1Segment(segment, separator, encChars);
    case 'GT1':
      return parseGT1Segment(segment, separator, encChars);
    case 'IN1':
      return parseIN1Segment(segment, separator, encChars);
    case 'IN2':
      return parseIN2Segment(segment, separator, encChars);
    case 'IN3':
      return parseIN3Segment(segment, separator, encChars);
    case 'DG1':
      return parseDG1Segment(segment, separator, encChars);
    case 'SCH':
      return parseSCHSegment(segment, separator, encChars);
    case 'RGS':
      return parseRGSSegment(segment, separator, encChars);
    case 'AIG':
      return parseAIGSegment(segment, separator, encChars);
    case 'AIL':
      return parseAILSegment(segment, separator, encChars);
    case 'AIP':
      return parseAIPSegment(segment, separator, encChars);
    case 'FT1':
      return parseFT1Segment(segment, separator, encChars);
    case 'PR1':
      return parsePR1Segment(segment, separator, encChars);
    case 'ROL':
      return parseROLSegment(segment, separator, encChars);
    case 'QRD':
      return parseQRDSegment(segment, separator, encChars);
    case 'MSA':
      return parseMSASegment(segment, separator, encChars);
    case 'MFI':
      return parseMFISegment(segment, separator, encChars);
    case 'MFE':
      return parseMFESegment(segment, separator, encChars);
    case 'STF':
      return parseSTFSegment(segment, separator, encChars);
    case 'PRA':
      return parsePRASegment(segment, separator, encChars);
    case 'ORC':
      return parseORCSegment(segment, separator, encChars);
    case 'OBR':
      return parseOBRSegment(segment, separator, encChars);
    case 'OBX':
      return parseOBXSegment(segment, separator, encChars);
    default:
      return parseOtherSegment(segment, separator, encChars);
  }
};

module.exports = {
  parseHL7Message,
};
