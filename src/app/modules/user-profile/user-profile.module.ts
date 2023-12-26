import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { UserProfilePageComponent } from './pages/user-profile-page/user-profile-page.component';
import { UserOrdersPageComponent } from './pages/user-orders-page/user-orders-page.component';
import { ChangePasswordPageComponent } from './pages/change-password-page/change-password-page.component';
import { UserDetailsPageComponent } from './pages/user-details-page/user-details-page.component';
// multilenguaje
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    UserProfilePageComponent,
    UserOrdersPageComponent,
    ChangePasswordPageComponent,
    UserDetailsPageComponent,
  ],
  imports: [
    CommonModule,
    UserProfileRoutingModule,
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
