export enum ContactKind {
  Phone,
  Url,
};

export enum ContactPurposeKind {
  BookAppointment,
  TakeAssessment,
  SeekGeneralInfo,
  SeekCOVIDInfo,
};

export type ContactType = {
  kind: ContactKind;
  purpose: ContactPurposeKind;
  value: any;
};

export interface PhoneContactType extends ContactType {
  kind: ContactKind.Phone;
  value: string;
};

export interface UrlContactType extends ContactType {
  kind: ContactKind.Url;
  value: string | URL;
};

export default ContactType;