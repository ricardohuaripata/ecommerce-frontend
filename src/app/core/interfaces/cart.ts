import { CartItem } from './cart-item';

export interface Cart {
  id: string;
  dateCreated: Date;
  dateLastModified: Date;
  dateExpiration: Date;
  cartItems: CartItem[];
  totalAmount: number;
  totalQuantity: number;

}
