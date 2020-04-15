import IdentifierType from './IdentifierType';
import LocationStatusValueset from './LocationStatusValueset';

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

type StringKeys = 'record_id' | 
  'location_id' | 
  'location_name' | 
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

type LocationKeys =  { [K in StringKeys]?: string } & 
  { [K in BooleanKeys]?: boolean } & 
  { [K in NumberKeys]?: number } & 
  { 'location_status'?: LocationStatusValueset } &
  { 'external_location_id'?: Array<IdentifierType> } | null
;

type LocationType = LocationKeys;

export default LocationType;