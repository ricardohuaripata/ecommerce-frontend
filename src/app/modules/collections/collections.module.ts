import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { ProductVariantPageComponent } from './pages/product-variant-page/product-variant-page.component';


@NgModule({
  declarations: [
    ProductItemComponent,
    ProductListComponent,
    CollectionPageComponent,
    ProductVariantPageComponent
  ],
  imports: [
    CommonModule,
    CollectionsRoutingModule
  ]
})
export class CollectionsModule { }
