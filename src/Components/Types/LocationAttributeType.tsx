import {
  faTasks,
  faVial,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { IconProp as LocationAttributeIcon } from '@fortawesome/fontawesome-svg-core';
import { LocationType, LocationKeys } from './LocationType';
import { LocationAttributeKind } from './LocationAttributeKind';

type CACKeys = 'TelemedicineOnlineScreeningOffered' |
  'SelfGuidedOnlineScreeningOffered' |
  'OnlineBookAppointmentOffered' 
;

type ComputedKeys = 'ScreeningRequired' |
  'OnlineScreeningOffered' |
  'OnlineScreeningRequired'
;

type GISCorpsKeys = 'DriveThroughOffered' |
  'ReferralRequired' |
  'AppointmentRequired' |
  'PhoneScreeningRequired' |
  'ScreeningOffered' |
  'TestingOffered' |
  'AntibodyTestingOffered' |
  'PCRTestingOffered'
;

type GoogleAnalyticsKeys = 'UpdateLocationName' |
  'UpdateLocationAddress' |
  'UpdateLocationMunicipality' |
  'UpdateLocationOwner' |
  'UpdateLocationOwnerKind' |
  'UpdateLocationPhoneNumber' |
  'UpdateLocationWebsite' |
  'UpdateLocationHoursOfOperation' |
  'UpdateLocationContactName' |
  'UpdateLocationContactPhoneMain' |
  'UpdateLocationContactEmailMain' |
  'UpdateLocationComments' |
  'UpdateLocationIntructions' |
  'UpdateLocationVehicleCapacity' |
  'UpdateLocationDailyTestingCapacity' |
  'UpdateLocationStatus' |
  'UpdateLocationDriveThroughOffered' |
  'UpdateLocationReferralRequired' |
  'UpdateLocationAppointmentRequired' |
  'UpdateLocationPhoneScreeningRequired' |
  'UpdateLocationScreeningOffered' |
  'UpdateLocationTestingOffered' |
  'UpdateLocationAntibodyTestingOffered' |
  'UpdateLocationPCRTestingOffered' |
  'UpdateLocationTelemedicineOnlineScreeningOffered' |
  'UpdateLocationSelfGuidedOnlineScreeningOffered' |
  'UpdateLocationOnlineBookAppointmentOffered' |
  'UpdateLocationScreeningRequired' |
  'UpdateLocationOnlineScreeningOffered' |
  'UpdateLocationOnlineScreeningRequired'
;

type UserCrowdsourcingKeys = 'ReportWaitTimeAtTestSite' |
  'ReportWaitTimeForResults' |
  'ReportAntibodyTestingReceived' |
  'ReportPCRTestingReceived' |
  'ReportAntibodyTestingProcedureClaimFDAApproval' |
  'ReportPCRTestingProcedureSelfAdministered' |
  'ReportAntibodyTestingPaymentOutOfPocketAmount' |
  'ReportPCRTestingPaymentOutOfPocketAmount' |
  'ReportAntibodyTestingInsuranceRejected' |
  'ReportPCRTestingInsuranceRejected' 
;

type LocationAttributeKeys = ({ [K in CACKeys]?: boolean } & 
  { [K in ComputedKeys]?: boolean } & 
  { [K in GISCorpsKeys]?: boolean } &
  { [K in GoogleAnalyticsKeys]?: string } & 
  { [K in UserCrowdsourcingKeys]?: string }
);

export interface LocationAttributeType {
  kind: LocationAttributeKind;
  label: string;
  value: ((location: LocationType) => Partial<LocationAttributeKeys>);
  icon: LocationAttributeIcon;
  // icon: IconDefinition;
}
;

export function toLocationAttribute(aValue: keyof LocationKeys): LocationAttributeType {
  // switch (key) {
  //   case value:
      
  //     break;
  
  //   default:
  //     break;
  // }
  
  switch (aValue) {
    case 'Clinic':
      return { kind: PlaceOfServiceKind.Clinic, icon: faClinicMedical };
    case 'Drive-thru':
      return { kind: PlaceOfServiceKind.DriveThru, icon: faCarSide };
    case 'Emergency Room':
      return { kind: PlaceOfServiceKind.EmergencyRoom, icon: faAmbulance };
    case 'FQHC':
      return { kind: PlaceOfServiceKind.Fqhc, icon: faHospitalAlt };
    case 'Health Center':
      return { kind: PlaceOfServiceKind.HealthCenter, icon: faFirstAid };
    case 'Hospital':
      return { kind: PlaceOfServiceKind.Hospital, icon: faHospital };
    case 'Immediate Care':
      return { kind: PlaceOfServiceKind.ImmediateCare, icon: faMedkit };
    case 'Medical Center':
      return { kind: PlaceOfServiceKind.MedicalCenter, icon: faHospital };
    case 'Other':
      return { kind: PlaceOfServiceKind.Other, icon: faHospital };
    case 'Primary Care':
      return { kind: PlaceOfServiceKind.PrimaryCare, icon: faUserMd };
    case 'Public Health Department':
      return { kind: PlaceOfServiceKind.PublicHealthDepartment, icon: faShieldAlt };
    case 'Retail':
      return { kind: PlaceOfServiceKind.Retail, icon: faStore };
    case 'Temporary':
      return { kind: PlaceOfServiceKind.Temporary, icon: faCampground };        
    case 'Urgent Care':
      return { kind: PlaceOfServiceKind.UrgentCare, icon: faStethoscope };
    default:
      return { kind: PlaceOfServiceKind.Other, icon: faHospital };
  };
};

export default LocationAttributeType;
export { LocationAttributeKind };
export type { LocationAttributeIcon };


