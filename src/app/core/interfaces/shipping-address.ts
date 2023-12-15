import { User } from './user';

export interface ShippingAddress {
  id: string;
  user: User;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  contactPhone: string;
  dateCreated: Date;
  dateLastModified: Date;
}
