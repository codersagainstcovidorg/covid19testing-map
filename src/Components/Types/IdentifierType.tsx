export enum IdentifierKind {
  String,
  Url,
  Uuid,
};

type IdentifierType = {
  system: IdentifierKind;
  value: string;
};

export default IdentifierType;