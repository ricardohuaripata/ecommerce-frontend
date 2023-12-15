import { ColorProductVariant } from './color-product-variant';

export interface ProductImage {
  id: number;
  colorProductVariant: ColorProductVariant;
  fileUrl: string;
  fileName: string;
  dateCreated: Date;
}
