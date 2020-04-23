import { ResourceType } from './ResourceType';
import { EndpointType } from './EndpointType';
import { IdentifierType } from './IdentifierType';

export interface EntityType extends ResourceType {
  resourceType: 'Place' | 'Location' | 'Activity' | 'Organization';
  identifier : IdentifierType | Array<IdentifierType> | null ; // Identifies the entity across multiple systems
  active : boolean | null; // Whether the entity's record is still in active use
  name? : string | null; // Name used for the entity
  alias? : Array<string> | null; // A list of alternate names that the entity is known as, or was known as in the past
  endpoint? : EndpointType | null; // Technical endpoints providing access to services operated for the organization
};
