import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  showPassword: boolean = false; // Variable para alternar entre mostrar y ocultar la contraseña

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use(sessionStorage.getItem('lang') || this.translate.getDefaultLang());
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
