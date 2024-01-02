import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserOrdersPageComponent } from './pages/user-orders-page/user-orders-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { AddShippingAddressPageComponent } from './pages/add-shipping-address-page/add-shipping-address-page.component';
import { EditShippingAddressPageComponent } from './pages/edit-shipping-address-page/edit-shipping-address-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePageComponent,
  },
  {
    path: 'details',
    component: UserDetailsPageComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordPageComponent,
  },
  {
    path: 'orders',
    component: UserOrdersPageComponent,
  },
  {
    path: 'shipping-address',
    component: AddShippingAddressPageComponent,
  },
  {
    path: 'shipping-address/:shippingAddressId',
    component: EditShippingAddressPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
