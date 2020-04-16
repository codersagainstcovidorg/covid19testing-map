import {
  faAmbulance,
  faCampground,
  faCarSide,
  faClinicMedical,
  faFirstAid,
  faHospital,
  faHospitalAlt,
  faMedkit,
  faShieldAlt,
  faStethoscope,
  faStore,
  faUserMd,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp as PlaceOfServiceIcon } from '@fortawesome/fontawesome-svg-core';
import { LocationPlaceOfServiceKind as PlaceOfServiceKind } from "./LocationPlaceOfServiceKind";

export interface LocationPlaceOfServiceType {
  kind: PlaceOfServiceKind;
  icon: PlaceOfServiceIcon;
};

export function toPlaceOfService(aValue: string): LocationPlaceOfServiceType {
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

export default LocationPlaceOfServiceType;
export { PlaceOfServiceKind as PlaceOfServiceKind };
export type { PlaceOfServiceIcon as PlaceOfServiceIcon };
