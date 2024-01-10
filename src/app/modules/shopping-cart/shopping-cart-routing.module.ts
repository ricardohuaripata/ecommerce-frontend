import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShoppingCartPageComponent } from './pages/shopping-cart-page/shopping-cart-page.component';
import { CheckoutPageComponent } from './pages/checkout-page/checkout-page.component';
import { AuthGuard } from 'src/app/core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ShoppingCartPageComponent,
    title: "Cart - Og's"
  },
  {
    path: 'checkout',
    component: CheckoutPageComponent,
    title: "Checkout - Og's",
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShoppingCartRoutingModule {}
