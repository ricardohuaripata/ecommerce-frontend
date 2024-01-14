import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password-page',
  templateUrl: './reset-password-page.component.html',
  styleUrls: ['./reset-password-page.component.scss'],
  providers: [MessageService],
})
export class ResetPasswordPageComponent implements OnInit, OnDestroy {
  showNewPassword: boolean = false;
  submited: boolean = false;
  form: FormGroup;
  disableForm: boolean = false;
  resetPasswordToken?: string;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.form = this.fb.group({
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

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        this.resetPasswordToken = params.get('token')!;
      })
    );
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  resetPassword() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.disableForm = true;

    const body: any = {
      password: this.form.value.password,
      passwordRepeat: this.form.value.passwordRepeat,
    };

    this.subscription.add(
      this.authService.resetPassword(this.resetPasswordToken!, body).subscribe({
        next: (response: any) => {
          const translatedMessage = this.translate.instant(
            'message.success.resetPassword'
          );
          Swal.fire({
            icon: 'success',
            text: translatedMessage,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/auth/login');
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
            // token invalido o usuario no encontrado
          } else if (
            event.error.statusCode == 404 ||
            event.error.statusCode == 400
          ) {
            this.messageService.add({
              severity: 'error',
              detail: event.error.message,
            });
            // error inesperado
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
