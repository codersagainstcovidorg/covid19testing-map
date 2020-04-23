type OrganizationAddressUse = 'primary' | 'administrative' | 'work' | 'temp' | 'old' | 'billing' | 'mailing' ; // purpose of this address
type PersonAddressUse = 'primary' | 'home' | 'work' | 'emergency' | 'vacation' | 'secondary' | 'billing' | 'mailing' | 'school' | 'shelter' ;
type AddressUse = OrganizationAddressUse | PersonAddressUse | 'general info' | 'call ahead' | 'covid' | 'appointments' | 'telemedicine' | 'hotline' | 'screening' | 'emergency' ; // purpose of this address
type AddressKind = 'postal' | 'physical' | 'both' ; // Distinguishes between physical addresses (those you can visit) and mailing addresses (e.g. PO Boxes and care-of addresses). Most addresses are both.
type AddressSystem = 'descriptive' | 'full' | 'parsed'; 

/** An address expressed using postal conventions (as opposed to GPS or other location definition formats)
 */
export type AddressType = {
  use? : AddressUse | string | null, // The purpose of this address
  kind? : AddressKind | string | null, // Distinguishes between physical addresses (those you can visit) and mailing addresses (e.g. PO Boxes and care-of addresses). Most addresses are both.
  system? : AddressSystem | null, // Hints at the standard formatting that is used - helpful when formulatinng RegEx/parsing scripts
  value : string | null, // Text representation of the full address
  line? : string | Array<string> | null, // Street name, number, direction & P.O. Box etc. This repeating element order: The order in which lines should appear in an address label
  city? : string | null, // Name of city, town etc.
  district? : string | null, // District name (aka county)
  state? : string | null, // Sub-unit of country (abbreviations ok)
  postalCode? : string | null, // Postal code for area
  country? : string | null, // Country (e.g. can be ISO 3166 2 or 3 letter code)
  // period? : string | null, // Time period when address was/is in use
  rank? : number | null, // Specify preferred order of use (1 = highest)
}

export interface OrganizationAddress extends AddressType {
  use? : OrganizationAddressUse | 'home care service origin' | null ; // The purpose of this address
  rank? : null;
}

export interface ServiceAddress extends AddressType {
  kind : AddressKind | 'drive-through' | 'curbside' | 'roadside' | 'parking lot' | 'mobile' | 'tent' | 'temporary' | 'store' | null ; // kind of address
  use? : 'COVID-19 screening and testing' | 'COVID-19 testing only' | 'COVID-19 screening only' | 'screening' | 'testing' | 'collection' | 'processing' | 'sample drop-off' | 'walk-in' | 'drop-in' | 'emergency' | 'billing' | 'home care service origin' | null ; // purpose of this address
  rank? : null;
}

export interface PersonAddress extends AddressType {
  kind: 'AddressKind' | 'encampment' | 'homeless' | 'shelter' ;
  use? : PersonAddressUse | null ; // The purpose of this address
  rank? : null;
}

