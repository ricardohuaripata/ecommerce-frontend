import { Cart } from './cart';
import { SizeColorProductVariant } from './size-color-product-variant';

export interface CartItem {
  id: string;
  cart: Cart;
  quantity: number;
  sizeColorProductVariant: SizeColorProductVariant;
}
