type PersonContactPointUse = 'home' | 'work' | 'temp' | 'old' | 'mobile' | 'emergency' | 'guarantor' | 'parent' | 'guardian' | 'results' | 'administrative' | 'scheduling'; // purpose of this person's contact point
type OrganizationContactPointUse = 'main' | 'general info' | 'covid' | 'appointments' | 'telemedicine' | 'hotline' | 'advice' | 'screening' | 'triage' | 'emergency' | 'billing' | 'administrative' | 'payor' | 'patient' | 'press' ; // purpose of this organization's contact point
type PlaceContactPointUse = 'general info' | 'call ahead' | 'covid' | 'appointments' | 'telemedicine' | 'hotline' | 'screening' | 'emergency' | 'billing' ; // purpose of this place's contact point
type ContactPointKind = 'phone number' | 'website' | 'app' | 'messaging' | 'address' | 'other'; // A coded type for the contact point that can be used to determine which contact point to use for a specific purpose.
type ContactPointSystem = 'phone' | 'url' | 'email' | 'Apple' | 'Android' | 'iMessage' | 'chat' | 'sms' | 'pager' | 'fax' | 'mail' ;

/** Details for all kinds of technology-mediated contact points for a person or organization, 
 * including telephone, email, etc.
 */
export type ContactPointType = {
  use : string | null, // The purpose of this contact point
  kind : ContactPointKind | null , // A coded type for the contact point that can be used to determine which contact point to use for a specific purpose.
  system : ContactPointSystem | null, // Establishes the namespace for the value
  value : string | null, // The actual contact point details
  rank? : number | null, // Specify preferred order of use (1 = highest)
}

/** Details for all kinds of technology-mediated contact points for a place
 * including telephone, email, etc.
 */
export interface PlaceContactPoint extends ContactPointType {
  use : PlaceContactPointUse; // The purpose of this contact point
}

/** Details for all kinds of technology-mediated contact points for a person
 * including telephone, email, etc.
 */
export interface PersonContactPoint extends ContactPointType {
  use : PersonContactPointUse; // The purpose of this contact point
}

/** Details for all kinds of technology-mediated contact points for an organization
 * including telephone, email, etc.
 */
export interface OrganizationContactPoint extends ContactPointType {
  use : OrganizationContactPointUse; // The purpose of this contact point
}
