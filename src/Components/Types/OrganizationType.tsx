import { EntityType } from './BaseTypes/EntityType';
import { OrganizationID as id } from './BaseTypes/IdentifierType';

enum OrganizationType {
  'CodersAgainstCOVID',
  'GISCorps',
};

export interface Organization extends EntityType {
  resourceType : 'Organization';
  identifier : Array<id>; // Identifies the entity across multiple systems
};

export default Organization;
export type { OrganizationID as id } from './BaseTypes/IdentifierType';