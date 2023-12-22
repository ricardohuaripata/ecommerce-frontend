import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService],
})
export class LoginPageComponent implements OnInit, OnDestroy {
  showPassword: boolean = false; // Variable para alternar entre mostrar y ocultar la contraseña
  submited: boolean = false;
  form: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use(
      sessionStorage.getItem('lang') || this.translate.getDefaultLang()
    );

    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  ngOnInit(): void {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signIn() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.form.disable;

    const body: any = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.subscription.add(
      this.authService.login(body).subscribe({
        next: (response: any) => {
          localStorage.setItem('auth_token', response.headers.get('Jwt-Token'));

          this.router.navigate(['/']);
        },
        error: (event) => {
          this.form.get('password')?.reset();
          const translatedMessage = this.translate.instant(
            'label.incorrectCredentials'
          );
          this.messageService.add({
            severity: 'error',
            detail: translatedMessage,
          });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
