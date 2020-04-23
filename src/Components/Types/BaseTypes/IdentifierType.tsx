// An unique code or number identifying the entity to its uses
// import { Entity } from './EntityType'; 

enum IdentifierSystemValueset {
  'CodersAgainstCOVID' = 'https://raw.githubusercontent.com/codersagainstcovidorg/codersagainstcovidorg-site/master/src/assets/cac_location_schema_v2.1.json',
  'GISCorps' = 'https://services.arcgis.com/8ZpVMShClf8U8dae/arcgis/rest/services/TestingLocations_public/FeatureServer/layers?f=pjson',
}

type IdentifierUse = 'primary' | 'slug' | 'usual' | 'official' | 'temp' | 'secondary' | 'old' | 'other' ;
type IdentifierKind = 'UUID' | 'esriFieldTypeOID' | 'URI' ;
type IdentifierSystem = IdentifierSystemValueset ;
type IdentifierField = 'OBJECTID' | 'location_id' | 'record_id' ;
type IdentifierFieldAlias = 'OBJECTID' | 'LocationID' ;
type IdentifierAssigner = keyof typeof IdentifierSystemValueset ;


export type IdentifierType = {
  use : IdentifierUse | string | null, // The purpose of this identifier
  kind : IdentifierKind | string | null, // A coded type for the identifier that can be used to determine which identifier to use for a specific purpose.
  system : IdentifierSystem | string | null, // Establishes the namespace for the value - that is, a URL that describes a set values that are unique
  field : IdentifierField | string | null, // The field or attribute name - can be used as a key
  alias? : IdentifierFieldAlias | string | null,  // A human-friendly name for the key
  value : string | null, // The value that is unique
  assigner? : IdentifierAssigner | string | null,// Organization that issued id (may be just text)
};

export interface GISLocationtID extends IdentifierType {
  use : "primary";
  kind : "esriFieldTypeOID" | 'esriFieldTypeString' | 'esriFieldTypeGlobalID' ;
  system : IdentifierSystemValueset.GISCorps | 'Esri' ;
  field : "OBJECTID" | 'GlobalID' | 'facilityid' ;
  alias : "OBJECTID" | 'GlobalID' | 'Facility ID' ;
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
