import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';

import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    ProductItemComponent,
    ProductListComponent,
    CollectionPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CollectionsRoutingModule
  ]
})
export class CollectionsModule { }
