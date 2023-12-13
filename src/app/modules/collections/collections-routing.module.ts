import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { ProductVariantPageComponent } from './pages/product-variant-page/product-variant-page.component';
import { NotFoundPageComponent } from '../home/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: ':categorySlugname',
    component: CollectionPageComponent
  },
  {
    path: ':categorySlugname/:productSlugname', // queryParam ".../?variant="
    component: ProductVariantPageComponent
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
