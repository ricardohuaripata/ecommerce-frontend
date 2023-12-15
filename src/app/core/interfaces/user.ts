import { ShippingAddress } from './shipping-address';

export interface User {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
  emailVerified: boolean;
  shippingAddressList: ShippingAddress[];
  dateCreated: Date;
  dateLastModified: Date;
}
