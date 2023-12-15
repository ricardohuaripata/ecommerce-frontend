import { Color } from './color';
import { Product } from './product';
import { ProductImage } from './product-image';

export interface ColorProductVariant {
  id: string;
  product: Product;
  color: Color;
  basePrice: number;
  finalPrice: number;
  mainImageUrl: string;
  mainImageName: string;
  productImageList: ProductImage[];
  dateCreated: Date;
  dateLastModified: Date;
}
