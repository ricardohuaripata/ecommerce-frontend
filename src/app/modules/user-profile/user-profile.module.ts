import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserOrdersPageComponent } from './pages/user-orders-page/user-orders-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

// multilenguaje
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';
import { AddShippingAddressPageComponent } from './pages/add-shipping-address-page/add-shipping-address-page.component';
import { EditShippingAddressPageComponent } from './pages/edit-shipping-address-page/edit-shipping-address-page.component';
import { OrderDetailsPageComponent } from './pages/order-details-page/order-details-page.component';
import { SharedModule } from "../../shared/shared.module";

@NgModule({
  declarations: [
    UserProfilePageComponent,
    UserOrdersPageComponent,
    ChangePasswordPageComponent,
    UserDetailsPageComponent,
    AddShippingAddressPageComponent,
    EditShippingAddressPageComponent,
    OrderDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastModule,
    ConfirmDialogModule,
    SharedModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
})
export class UserProfileModule {}
