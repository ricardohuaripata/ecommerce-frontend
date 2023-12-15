import { OrderItem } from './order-item';
import { User } from './user';

export interface Order {
  id: string;
  user: User;
  status: string;
  chargeId: string;
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  contactPhone: string;
  dateCreated: Date;
  dateLastModified: Date;
  orderItems: OrderItem[];
}
