import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-add-shipping-address-page',
  templateUrl: './add-shipping-address-page.component.html',
  styleUrls: ['./add-shipping-address-page.component.scss'],
  providers: [MessageService],
})
export class AddShippingAddressPageComponent implements OnInit, OnDestroy {
  submited: boolean = false;
  form: FormGroup;
  disableForm: boolean = false;
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
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(64),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(64),
        ],
      ],
      country: ['', [Validators.required, Validators.maxLength(64)]],
      city: ['', [Validators.required, Validators.maxLength(64)]],
      postalCode: ['', [Validators.required, Validators.maxLength(10)]],
      address: ['', [Validators.required, Validators.maxLength(512)]],
      contactPhone: ['', [Validators.required, Validators.maxLength(20)]],
    });
  }

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });
  }

  addShippingAddress(): void {
    this.submited = true;

    if (this.form.invalid) {
      return;
    }

    this.disableForm = true;

    const body: any = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      country: this.form.value.country,
      city: this.form.value.city,
      postalCode: this.form.value.postalCode,
      address: this.form.value.address,
      contactPhone: this.form.value.contactPhone,
    };

    this.subscription.add(
      this.userService.createShippingAddress(body).subscribe({
        next: (response: any) => {
          this.router.navigateByUrl('/account/details');
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
