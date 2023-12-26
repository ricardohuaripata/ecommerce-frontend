import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserOrdersPageComponent } from './pages/user-orders-page/user-orders-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';

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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserProfileRoutingModule {}
