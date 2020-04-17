type URI = string;

/** Set of metadata that provides technical and workflow context to the 
 * resource. */
export interface MetaType {
  versionId? : string, // Version specific identifier
  lastUpdated? : Date, // When the resource version last changed
  source? : URI, // URI that identifies where the resource comes from
}