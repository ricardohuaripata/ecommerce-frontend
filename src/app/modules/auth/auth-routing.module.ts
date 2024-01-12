import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './pages/reset-password-page/reset-password-page.component';
import { VerifyEmailPageComponent } from './pages/verify-email-page/verify-email-page.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
    title: "Login - Og's",
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    title: "Register - Og's",
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordPageComponent,
    title: "Forgot Password - Og's",
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordPageComponent,
    title: "Reset Password - Og's",
  },
  {
    path: 'verify-email/:token',
    component: VerifyEmailPageComponent,
    title: "Verify Email - Og's",
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
