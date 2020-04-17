import { ResourceType } from './ResourceType';
import { EndpointType } from './EndpointType';
import { IdentifierType } from './IdentifierType';

export interface EntityType extends ResourceType {
  resourceType: 'Place' | 'Activity' | 'Organization';
  identifier : IdentifierType | Array<IdentifierType>; // Identifies the entity across multiple systems
  name? : string | null; // Name used for the entity
  alias? : Array<string> | null; // A list of alternate names that the entity is known as, or was known as in the past
  endpoint? : EndpointType | null; // Technical endpoints providing access to services operated for the organization
};
