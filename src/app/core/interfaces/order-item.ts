import { Order } from './order';
import { SizeColorProductVariant } from './size-color-product-variant';

export interface OrderItem {
  id: string;
  order: Order;
  sizeColorProductVariant: SizeColorProductVariant;
  quantity: number;
  unitPrice: number;
}
