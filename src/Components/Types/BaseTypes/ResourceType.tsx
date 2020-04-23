import { MetaType } from "./MetaType";

// Allowed values for `ResourceTypeKind`
export type ResourceTypeKind = 'Entity' | 
  'Person' |
  'Place' |
  'Location' |
  'Organization' |
  'Group' |
  'Activity' |
  'Product' |
  'Service' |
  'Endpoint'
;

/** 
 * @description A resource is an entity that:
 * has a known identity (a URL) by which it can be addressed
 * identifies itself as one of the types of resource defined in this specification
 * contains a set of structured data items as described by the definition of the resource type
 * has an identified version that changes if the contents of the resource change
 * 
 * @see https://www.hl7.org/fhir/resource.html
 */
export type ResourceType = {
  resourceType : ResourceTypeKind, // The kind of resource
  meta? : MetaType | null, // Metadata about the resource  
};


export type { MetaType } from "./MetaType";
export default ResourceType;