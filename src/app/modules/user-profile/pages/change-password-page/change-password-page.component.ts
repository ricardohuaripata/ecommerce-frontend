import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password-page',
  templateUrl: './change-password-page.component.html',
  styleUrls: ['./change-password-page.component.scss'],
  providers: [MessageService],
})
export class ChangePasswordPageComponent implements OnInit, OnDestroy {
  showOldPassword: boolean = false;
  showNewPassword: boolean = false;
  submited: boolean = false;
  form: FormGroup;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {
    this.form = this.fb.group({
      oldPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          this.passwordFormatValidator,
        ],
      ],
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
  }

  toggleOldPasswordVisibility() {
    this.showOldPassword = !this.showOldPassword;
  }

  toggleNewPasswordVisibility() {
    this.showNewPassword = !this.showNewPassword;
  }

  changePassword() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.form.disable;

    const body: any = {
      oldPassword: this.form.value.oldPassword,
      password: this.form.value.password,
      passwordRepeat: this.form.value.passwordRepeat,
    };

    this.subscription.add(
      this.userService.updateUserPassword(body).subscribe({
        next: (response: any) => {
          const translatedMessage = this.translate.instant(
            'message.success.passwordChanged'
          );
          Swal.fire({
            icon: 'success',
            text: translatedMessage,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1500,
          });

          this.router.navigateByUrl('/account');
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
            this.form.get('oldPassword')?.reset();
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
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
