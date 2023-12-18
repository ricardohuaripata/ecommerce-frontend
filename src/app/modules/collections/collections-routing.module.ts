import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollectionPageComponent } from './pages/collection-page/collection-page.component';
import { NotFoundPageComponent } from '../home/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: ':categorySlugname',
    component: CollectionPageComponent
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
