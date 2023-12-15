import { Category } from './category';

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: Category;
  dateCreated: Date;
  dateLastModified: Date;
}
