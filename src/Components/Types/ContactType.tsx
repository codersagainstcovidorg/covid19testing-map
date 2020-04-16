import ContactKind from './ContactKind';
import ContactPurposeKind from './ContactPurposeKind';

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