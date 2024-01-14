import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { ShippingAddress } from 'src/app/core/interfaces/shipping-address';
import { User } from 'src/app/core/interfaces/user';
import { LanguageService } from 'src/app/core/services/language.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-details-page',
  templateUrl: './user-details-page.component.html',
  styleUrls: ['./user-details-page.component.scss'],
  providers: [MessageService],
})
export class UserDetailsPageComponent implements OnInit, OnDestroy {
  submited: boolean = false;
  form: FormGroup;
  private subscription: Subscription = new Subscription();
  authUser?: User;
  buttonCooldown: boolean = false;
  millisecondsTimeCooldown: number = 1000;
  shippingAddressList: ShippingAddress[] = [];
  loading: boolean = true;
  processing: boolean = false;

  constructor(
    private translate: TranslateService,
    private fb: FormBuilder,
    private userService: UserService,
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
    });
  }

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.userService.loggedUser$.subscribe((user) => {
        this.authUser = user;
        this.form.patchValue({
          firstName: this.authUser?.firstName,
          lastName: this.authUser?.lastName,
        });
        this.subscription.add(
          this.userService.getUserShippingAddresses().subscribe((data: any) => {
            this.shippingAddressList = data;
            this.loading = false;
          })
        );
      })
    );
  }

  updateUserDetails(): void {
    this.submited = true;

    if (this.form.invalid) {
      return;
    }

    this.buttonCooldown = true;

    const body: any = {
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
    };

    this.subscription.add(
      this.userService.updateUserDetails(body).subscribe({
        next: (response: any) => {
          this.userService.updateLoggedUser(response);
          const translatedMessage = this.translate.instant(
            'message.success.userDetailsChanged'
          );
          this.messageService.add({
            severity: 'success',
            detail: translatedMessage,
          });
          setTimeout(() => {
            this.buttonCooldown = false;
          }, this.millisecondsTimeCooldown);
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

          setTimeout(() => {
            this.buttonCooldown = false;
          }, this.millisecondsTimeCooldown);
        },
      })
    );
  }

  deleteShippingAddress(shippingAddressId: string): void {
    if (this.processing) {
      return;
    }
    this.processing = true;

    this.subscription.add(
      this.userService
        .deleteShippingAddress(shippingAddressId)
        .subscribe((data: any) => {
          const index = this.shippingAddressList.findIndex(
            (address) => address.id === shippingAddressId
          );
          if (index !== -1) {
            this.shippingAddressList.splice(index, 1); // Elimina la dirección de la lista local
          }
          this.processing = false;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
