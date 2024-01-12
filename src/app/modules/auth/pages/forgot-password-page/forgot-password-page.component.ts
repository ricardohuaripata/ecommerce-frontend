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
import { AuthService } from 'src/app/core/services/auth.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss'],
  providers: [MessageService],
})
export class ForgotPasswordPageComponent implements OnInit, OnDestroy {
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
      email: ['', [Validators.required, this.emailValidator]],
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

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });
  }

  forgotPassword() {
    this.submited = true;
    if (this.form.invalid) {
      return;
    }

    this.disableForm = true;

    const body: any = {
      email: this.form.value.email,
    };

    this.subscription.add(
      this.authService.forgotPassword(body).subscribe({
        next: (response: any) => {
          Swal.fire({
            icon: 'success',
            text: response.message,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1500,
          });
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
          } else if (event.error.statusCode == 404) {
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
