import { EntityType } from "./EntityType";
import { IdentifierType as id } from './IdentifierType';
import { PlaceContactPoint as LocationContactPoint } from "./ContactPointType";
import { Organization } from "../OrganizationType";
import { AddressType, ServiceAddress } from "./AddressType";

type PlaceKind = 'Site' | 'Building' | 'Wing' | 'Ward' | 'Level' | 'Corridor' | 'Room' | 'Bed' | 'Vehicle' | 'House' | 'Cabinet' | 'Road' | 'Area' | 'Jurisdiction' | string ; // Physical form of the place(s)
type LocationKind = 'Position' | 'Point' ; // Physical form of the location
// type PlaceMode = 'class' | 'instance';

/** The absolute geographic location */
interface GeoPosition {
  coords: {
    longitude : number | null; // Longitude with WGS84 datum
    latitude : number | null; // Latitude with WGS84 datum
    altitude? : number | null; // Altitude with WGS84 datum
    accuracy? : number | null;
  };
  timestamp: number;
};

/** What days/times during a week is this location usually open */
interface Schedule {
  daysOfWeek : 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun' ;
  allDay : boolean; // The Location is open all day
  openingTime : string; // Time that the Location opens
  closingTime : string; // Time that the Location closes
};

/** Details and position information for a place.
 * 
 */
interface Place extends EntityType {
  resourceType : 'Location' | 'Place' ;
  identifier : id | Array<id> | null; // Identifies the place across multiple systems
  use? : string | Array<string> | null; // The purpose of this place
  kind : PlaceKind | null; // Physical form of the place
  description? : string  | null; // Additional details about the place that could be displayed as further information to identify the place beyond its name
  partOf? : Place | null; // Another place this one is physically a part of
}

/** Details and position information for a physical location where services are provided and 
 * resources and participants may be stored, found, contained, or accommodated. 
 * */
export interface Location extends Place {
  resourceType : 'Location';
  kind : LocationKind | PlaceKind | null; // Physical form of the location
  status : ; // The general availability of the resource, not the current value which may be covered by the operationalStatus, or by a schedule/slots if they are configured for the location.

  // "operationalStatus" : { Coding }; // The operational status of the location
  contact? : LocationContactPoint | Array<LocationContactPoint> | null; // Contact detail for the location
  address? : ServiceAddress | null; // An address for the place
  position? : GeoPosition | null ; // The absolute geographic location
  hoursOfOperation? : Schedule | Array<Schedule> | null ; // What days/times during a week is this location usually open
  
  managingOrganization? : Organization | Array<Organization> | null; // Organization responsible for provisioning and upkeep
  availabilityExceptions? : string | null; // A description of when the locations opening ours are different to normal, e.g. public holiday availability. Succinctly describing all possible exceptions to normal site availability as detailed in the opening hours Times.
  
}
