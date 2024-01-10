import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './modules/home/pages/not-found-page/not-found-page.component';
import { AuthGuard } from './core/guard/auth.guard';

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
    path: 'products',
    loadChildren: () => import(`./modules/products/products.module`).then(m => m.ProductsModule)
  },
  {
    path: 'shopping-cart',
    loadChildren: () => import(`./modules/shopping-cart/shopping-cart.module`).then(m => m.ShoppingCartModule)
  },
  {
    path: 'account',
    loadChildren: () => import(`./modules/user-profile/user-profile.module`).then(m => m.UserProfileModule), canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    title: 'Error 404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
