import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './modules/home/pages/not-found-page/not-found-page.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import(`./modules/home/home.module`).then(m => m.HomeModule)
  },
  {
    path: 'auth', //TODO (Public) Login, Register, Forgot...
    loadChildren: () => import(`./modules/auth/auth.module`).then(m => m.AuthModule)
  },
  {
    path: 'collections',
    loadChildren: () => import(`./modules/collections/collections.module`).then(m => m.CollectionsModule)
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
