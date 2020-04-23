import { EntityType } from './BaseTypes/EntityType';
import { OrganizationID as id } from './BaseTypes/IdentifierType';
import { OrganizationContactPoint as ContactPoint } from './BaseTypes/ContactPointType'

type OrganizationKind = 'Municipal' | 'County' | 'Regional' | 'School' | 'State' | 'Federal' | 'International' | 'Tribal' | 'Private' | 'Nonprofit' | 'Veterans Affairs (VA)' | 'Other' ;

/**
 * A formally or informally recognized grouping of people or organizations formed for the 
 * purpose of achieving some form of collective action. Includes companies, institutions, 
 * corporations, departments, community groups, healthcare practice groups, payer/insurer, 
 * etc.
 */
export interface Organization extends EntityType {
  resourceType : 'Organization';
  identifier : id | Array<id> | null; // Identifies the entity across multiple systems
  kind? : OrganizationKind | null; // Kind of organization
  contact? : ContactPoint | Array<ContactPoint>; // Contact detail for the organization
  address? : null; // An address for the organization
  partOf? : Organization | null; // The organization of which this organization forms a part
};

export type { OrganizationID as id } from './BaseTypes/IdentifierType';