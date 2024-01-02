import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/core/services/auth.service';

import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/core/services/user.service';
import { LanguageService } from 'src/app/core/services/language.service';

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
  disableForm: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordFormatValidator,
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });
  }

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.value;
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (email && !pattern.test(email)) {
      return { invalidEmail: true };
    }

    return null;
  }

  passwordFormatValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const password = control.value;

    // Verifica al menos una letra minúscula, una letra mayúscula, un número y un carácter especial
    if (
      !/(?=.*[a-z])/.test(password) ||
      !/(?=.*[A-Z])/.test(password) ||
      !/(?=.*\d)/.test(password) ||
      !/(?=.*[!@#$%^&*()\-_=+{};:,<.>ยง?\\|[\]\/~`"'])/.test(password)
    ) {
      return { invalidPasswordFormat: true };
    }

    return null;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  signIn() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.disableForm = true;

    const body: any = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    this.subscription.add(
      this.authService.login(body).subscribe({
        next: (response: any) => {
          localStorage.setItem('auth_token', response.headers.get('Jwt-Token'));
          this.userService.updateLoggedUser(response.body);
          this.router.navigateByUrl('/account');
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
          this.disableForm = false;
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
