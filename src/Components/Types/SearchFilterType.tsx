export interface RawDataType {
  is_flagged?: boolean;
  is_temporary?: boolean;
  is_drive_through?: boolean;
  is_same_day_result?: boolean;
  is_scheduled_to_open?: boolean;
  is_scheduled_to_close?: boolean;
  does_offer_antibody_test?: boolean;
  days_remaining_until_open?: number;
  does_offer_molecular_test?: boolean;
  days_remaining_until_close?: number;
  period_start?: string;
  period_end?: string;
};


export type SearchFilterType = {
  location_id?: string;
  location_name?: string;
  location_address_street?: string;
  location_address_locality?: string;
  location_address_region?: string;
  location_address_postal_code?: string;
  location_latitude?: number;
  location_longitude?: number;
  location_contact_phone_main?: string;
  location_contact_phone_appointments?: string;
  location_contact_phone_covid?: string;
  location_contact_url_main?: string;
  location_contact_url_covid_info?: string;
  location_contact_url_covid_screening_tool?: string;
  location_contact_url_covid_virtual_visit?: string;
  location_contact_url_covid_appointments?: string;
  location_place_of_service_type?: string;
  location_hours_of_operation?: string;
  is_evaluating_symptoms?: boolean;
  is_evaluating_symptoms_by_appointment_only?: boolean;
  is_ordering_tests?: boolean;
  is_ordering_tests_only_for_those_who_meeting_criteria?: boolean;
  is_collecting_samples?: boolean;
  is_collecting_samples_onsite?: boolean;
  is_collecting_samples_for_others?: boolean;
  is_collecting_samples_by_appointment_only?: boolean;
  is_processing_samples?: boolean;
  is_processing_samples_onsite?: boolean;
  is_processing_samples_for_others?: boolean;
  location_specific_testing_criteria?: string;
  additional_information_for_patients?: string;
  reference_publisher_of_criteria?: string;
  data_source?: string;
  raw_data?: RawDataType;
  created_on?: string;
  updated_on?: string;
  location_status?: string;
};

export default SearchFilterType;