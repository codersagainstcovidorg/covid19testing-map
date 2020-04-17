import { ResourceType } from './ResourceType';
import { EndpointID } from './IdentifierType';

type EndpointStatus = 'active' | 'suspended' | 'error' | 'off' | 'test';
type EndpointKind = 'REST' | 'GraphQL' | 'File';
type EndpointPayloadSchema = 'GISCorps' | 'Coders Against COVID' | 'Other' ;

/**
 * The technical details of an endpoint that can be used for electronic services.
 */
export type EndpointType = {
  status : EndpointStatus, // active | suspended | error | off | test
  kind : EndpointKind, // A  coded value that represents the technical details of the usage of this endpoint (e.g. RESTful API, GraphQL API)
  name? : string | null,  // A friendly name that this endpoint can be referred to with.
  payloadSchema : EndpointPayloadSchema, // The payload schema describes the acceptable content that can be communicated on the endpoint.
  payloadMimeType? : MimeTypeArray | null, // Mimetype to send. If not specified, the content could be anything (including no payload, if the connectionType defined this)
  connectionUrl : URL, // The uri that describes the actual end-point to connect to
  headers?: Array<String> | null,// Additional headers / information to send as part of the notification
};

/**
 * The technical details of a RESTful API that can be used for electronic services.
 */
export interface RESTfulEndpoint extends EndpointType, ResourceType {
  resourceType : 'Endpoint';
  kind : 'REST';
  identifier : Array< EndpointID>; // Identifier for the organization that is used to identify the endpoint across multiple disparate systems.
};
