import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserOrdersPageComponent } from './pages/user-orders-page/user-orders-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { AddShippingAddressPageComponent } from './pages/add-shipping-address-page/add-shipping-address-page.component';
import { EditShippingAddressPageComponent } from './pages/edit-shipping-address-page/edit-shipping-address-page.component';
import { OrderDetailsPageComponent } from './pages/order-details-page/order-details-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePageComponent,
    title: "Account - Og's"
  },
  {
    path: 'details',
    component: UserDetailsPageComponent,
    title: "Account Details - Og's"
  },
  {
    path: 'change-password',
    component: ChangePasswordPageComponent,
    title: "Change Password - Og's"
  },
  {
    path: 'orders',
    component: UserOrdersPageComponent,
    title: "My Orders - Og's"
  },
  {
    path: 'orders/:orderId',
    component: OrderDetailsPageComponent,
    title: "Orders Details - Og's"
  },
  {
    path: 'shipping-address',
    component: AddShippingAddressPageComponent,
    title: "Add Shipping Address - Og's"
  },
  {
    path: 'shipping-address/:shippingAddressId',
    component: EditShippingAddressPageComponent,
    title: "Edit Shipping Address - Og's"
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
