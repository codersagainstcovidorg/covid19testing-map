import IdentifierType from './IdentifierType';
import { ContactPurposeKind as ContactPurpose } from './ContactPurposeKind';
import ContactKind from './ContactKind';
import LocationStatusKind from './LocationStatusKind';
import { LocationPlaceOfServiceType as PlaceOfServiceType } from './LocationPlaceOfServiceType';
import { isDescriptionLike, isURLLike, toCleanString } from "../../utils/helperMethods";
import { TESTING_CRITERIA_URL_CDC } from '../../constants';
import { toPlaceOfService } from './LocationPlaceOfServiceType';

type IdentifierKeys = 'record_id' | 
  'location_id'
;

type BooleanKeys = 'is_hidden' | 
  'is_verified' | 
  'is_evaluating_symptoms' | 
  'is_evaluating_symptoms_by_appointment_only' | 
  'is_ordering_tests' | 
  'is_ordering_tests_only_for_those_who_meeting_criteria' | 
  'is_collecting_samples' | 
  'is_collecting_samples_onsite' | 
  'is_collecting_samples_for_others' | 
  'is_collecting_samples_by_appointment_only' | 
  'is_processing_samples' | 
  'is_processing_samples_onsite' | 
  'is_processing_samples_for_others'
;

type NumberKeys = 'location_latitude' | 
  'location_longitude'
;

type StringKeys = 'location_name' | 
  'location_address_street' | 
  'location_address_locality' | 
  'location_address_region' | 
  'location_address_postal_code' | 
  'location_contact_phone_main' | 
  'location_contact_phone_appointments' | 
  'location_contact_phone_covid' | 
  'location_contact_url_main' | 
  'location_contact_url_covid_info' | 
  'location_contact_url_covid_screening_tool' | 
  'location_contact_url_covid_virtual_visit' | 
  'location_contact_url_covid_appointments' | 
  'location_place_of_service_type' | 
  'location_hours_of_operation' | 
  'location_specific_testing_criteria' | 
  'additional_information_for_patients' | 
  'reference_publisher_of_criteria' | 
  'data_source' | 
  'raw_data' | 
  'geojson' | 
  'created_on' | 
  'updated_on' | 
  'deleted_on'
;

export type LocationKeys = ({ [K in IdentifierKeys]: string } &
  { [K in StringKeys]?: string } & 
  { [K in BooleanKeys]?: boolean } & 
  { [K in NumberKeys]?: number } & 
  { 'location_status'?: LocationStatusKind } &
  { 'external_location_id'?: Array<IdentifierType> })
;

export class LocationType {
  readonly keys: LocationKeys;
  constructor(keys: any) {
    this.keys = keys
  };
  
  doesApplyTestingCriteria(): boolean {
    let testingCriteriaValue: string = this.keys.location_specific_testing_criteria ?? "";
    let testingCriteriaRefValue: string = this.keys.reference_publisher_of_criteria ?? "";
    
    return (
      (this.keys.is_evaluating_symptoms ?? false) || 
      (this.keys.is_evaluating_symptoms_by_appointment_only ?? false) || 
      (this.keys.is_ordering_tests_only_for_those_who_meeting_criteria ?? false) || 
      (isURLLike(this.keys.location_contact_url_covid_screening_tool)) || 
      (isURLLike(this.keys.location_contact_url_covid_virtual_visit)) || 
      (isURLLike(testingCriteriaValue) || isDescriptionLike(testingCriteriaValue)) || 
      (isURLLike(testingCriteriaRefValue) || isDescriptionLike(testingCriteriaRefValue))
    )
  };
  
  getContact(contactKind: ContactKind, forPurpose: ContactPurpose): string | null {
    let aLocation = this.keys;
    
    switch (contactKind) {
      case ContactKind.Phone: 
        if (forPurpose === ContactPurpose.BookAppointment) {
          return (toCleanString(aLocation?.location_contact_phone_appointments) ?? toCleanString(aLocation?.location_contact_phone_main)) ?? null;
        }
        else if ((forPurpose === ContactPurpose.SeekCOVIDInfo) || (forPurpose === ContactPurpose.TakeAssessment)) {
          return (toCleanString(aLocation?.location_contact_phone_covid) ?? toCleanString(aLocation?.location_contact_phone_main)) ?? null;
        }
        else {
          return toCleanString(aLocation?.location_contact_phone_main) ?? null;
        }
      case ContactKind.Url: 
        if (forPurpose === ContactPurpose.BookAppointment) {
          return (toCleanString(aLocation?.location_contact_url_covid_appointments) ?? toCleanString(aLocation?.location_contact_url_covid_virtual_visit)  ?? null);
        }
        else if (forPurpose === ContactPurpose.SeekCOVIDInfo) {
          return toCleanString(aLocation?.location_contact_url_covid_screening_tool) ?? null;
        }
        else if (forPurpose === ContactPurpose.TakeAssessment) {
          return toCleanString(aLocation?.location_contact_url_covid_screening_tool) ?? null;
        }
        else {
          return toCleanString(aLocation?.location_contact_url_main) ?? null;
        }
      default: return "";
    }
  };
  
  getTestingCriteria(): string | null {
    let testingCriteriaValue: string = toCleanString(this.keys.location_specific_testing_criteria);
    let testingCriteriaRefValue: string = toCleanString(this.keys.reference_publisher_of_criteria);
    
    if (this.doesApplyTestingCriteria()) {
      if (isDescriptionLike(testingCriteriaValue)) {
        return testingCriteriaValue;
      }
      else if (isURLLike(testingCriteriaValue)) {
        return testingCriteriaValue;
      }
      else if (isURLLike(this.keys.location_contact_url_covid_screening_tool)) {
        return toCleanString(this.keys.location_contact_url_covid_screening_tool);
      }
      else if (isURLLike(this.keys.location_contact_url_covid_info)) {
        return toCleanString(this.keys.location_contact_url_covid_info);
      }
      else if (isURLLike(this.keys.location_contact_url_covid_virtual_visit)) {
        return toCleanString(this.keys.location_contact_url_covid_virtual_visit);
      }
      else if (isURLLike(this.keys.location_contact_url_main)) {
        return toCleanString(this.keys.location_contact_url_main);
      }
      else if (isURLLike(testingCriteriaRefValue)) {
        return testingCriteriaRefValue;
      }
      else {
        return TESTING_CRITERIA_URL_CDC;
      }
    }
    else {
      return null;
    }
  };
  
  getPlaceOfService(): PlaceOfServiceType {
    let placeOfServiceValue: string = toCleanString(this.keys.location_place_of_service_type ?? "Other");
    return toPlaceOfService(placeOfServiceValue);
  }
}

export { ContactKind }from './ContactKind';
export { ContactPurposeKind as ContactPurpose } from './ContactPurposeKind';
export { LocationPlaceOfServiceKind as PlaceOfServiceKind } from './LocationPlaceOfServiceKind';
export type { LocationPlaceOfServiceType as PlaceOfServiceType } from './LocationPlaceOfServiceType';
export default LocationType;