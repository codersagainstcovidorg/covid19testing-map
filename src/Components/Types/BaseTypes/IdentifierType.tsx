// An unique code or number identifying the location to its uses
// import { Entity } from './EntityType'; 

enum IdentifierSystemValueset {
  'CodersAgainstCOVID' = 'https://raw.githubusercontent.com/codersagainstcovidorg/codersagainstcovidorg-site/master/src/assets/cac_location_schema_v2.1.json',
  'GISCorps' = 'https://services.arcgis.com/8ZpVMShClf8U8dae/arcgis/rest/services/TestingLocations_public/FeatureServer/layers?f=pjson',
}

type IdentifierUse = 'primary' | 'slug' | 'usual' | 'official' | 'temp' | 'secondary' | 'old' ;
type IdentifierKind = 'UUID' | 'esriFieldTypeOID' | 'URI';
type IdentifierSystem = IdentifierSystemValueset | null;
type IdentifierField = 'OBJECTID' | 'location_id' | 'record_id' | string | null ; 
type IdentifierFieldAlias = 'OBJECTID' | 'LocationID';
type IdentifierAssigner = keyof typeof IdentifierSystemValueset;


export type IdentifierType = {
  use : IdentifierUse, // The purpose of this identifier
  kind : IdentifierKind, // A coded type for the identifier that can be used to determine which identifier to use for a specific purpose.
  system : IdentifierSystem , // Establishes the namespace for the value - that is, a URL that describes a set values that are unique
  field : IdentifierField, // The field or attribute name - can be used as a key
  alias? : IdentifierFieldAlias,  // A human-friendly name for the key
  value : string, // The value that is unique
  assigner? : IdentifierAssigner | string | null,// Organization that issued id (may be just text)
};

export interface GISLocationtId extends IdentifierType {
  use : "primary";
  kind : "esriFieldTypeOID";
  system : IdentifierSystemValueset.GISCorps;
  field : "OBJECTID";
  alias : "OBJECTID"; 
  assigner : "GISCorps";
};

export interface CACLocationID extends IdentifierType {
  use : "old";
  kind : "UUID";
  system : IdentifierSystemValueset.CodersAgainstCOVID;
  field : "location_id";
  alias : "LocationID";
  assigner : "CodersAgainstCOVID";
}

export interface EndpointID extends IdentifierType {
  use : "primary";
  kind : "URI";
  system : IdentifierSystemValueset.CodersAgainstCOVID;
}

export interface OrganizationID extends IdentifierType {
  use : "primary";
  kind : "UUID";
  system : IdentifierSystemValueset.CodersAgainstCOVID;
  assigner : "CodersAgainstCOVID";
}
