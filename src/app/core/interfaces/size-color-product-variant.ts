import { ColorProductVariant } from './color-product-variant';

export interface SizeColorProductVariant {
  id: string;
  colorProductVariant: ColorProductVariant;
  size: string;
  stock: number;
  dateCreated: Date;
  dateLastModified: Date;
}
