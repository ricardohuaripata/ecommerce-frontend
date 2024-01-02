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
import Swal from 'sweetalert2';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
  providers: [MessageService],
})
export class RegisterPageComponent implements OnInit, OnDestroy {
  showPassword: boolean = false; // Variable para alternar entre mostrar y ocultar la contraseña
  submited: boolean = false;
  form: FormGroup;
  disableForm: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(64)]],
      email: ['', [Validators.required, this.emailValidator]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordFormatValidator,
        ],
      ],
      passwordRepeat: [
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

  signUp() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.disableForm = true;

    const body: any = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      password: this.form.value.password,
      passwordRepeat: this.form.value.passwordRepeat,
    };

    this.subscription.add(
      this.authService.register(body).subscribe({
        next: (response: any) => {
          const translatedMessage = this.translate.instant(
            'message.success.signup'
          );
          Swal.fire({
            icon: 'success',
            text: translatedMessage,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1500,
          });
          this.router.navigate(['/auth/login']);
        },
        error: (event) => {
          if (event.error.validationErrors) {
            for (const key in event.error.validationErrors) {
              this.form.get(key)?.reset();
              this.messageService.add({
                severity: 'error',
                detail: event.error.validationErrors[key][0]['message'],
              });
            }
          } else if (event.error.statusCode == 400) {
            this.messageService.add({
              severity: 'error',
              detail: event.error.message,
            });
          } else {
            this.messageService.add({
              severity: 'error',
              detail: 'Unexpected error',
            });
          }
          this.disableForm = false;

        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
