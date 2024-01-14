import { HttpErrorResponse } from '@angular/common/http';
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
import { Cart } from 'src/app/core/interfaces/cart';
import { ShippingAddress } from 'src/app/core/interfaces/shipping-address';
import { CartService } from 'src/app/core/services/cart.service';
import { LanguageService } from 'src/app/core/services/language.service';
import { OrderService } from 'src/app/core/services/order.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.scss'],
  providers: [MessageService],
})
export class CheckoutPageComponent implements OnInit, OnDestroy {
  targetCart?: Cart;
  loading: boolean = true;
  submited: boolean = false;
  form: FormGroup;
  disableForm: boolean = false;
  shippingAddressList: ShippingAddress[] = [];
  selectedShippindAddress?: ShippingAddress;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private cartService: CartService,
    private orderService: OrderService,
    private languageService: LanguageService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private messageService: MessageService
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
      cardNumber: ['', [Validators.required, this.creditCardValidator]],
      expDate: ['', [Validators.required, this.expDateValidator]],
      cvc: ['', [Validators.required, this.cvcValidator]],
    });
  }

  creditCardValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    // Eliminar espacios en blanco y guiones (si los hay) del número de tarjeta
    const sanitizedValue = value.replace(/[\s-]/g, '');

    // Verificar si el número de tarjeta contiene solo dígitos
    if (!/^\d+$/.test(sanitizedValue)) {
      return { invalidCreditCard: true };
    }

    // Verificar si la longitud del número de tarjeta es válida (generalmente 13-19 dígitos)
    if (sanitizedValue.length < 13 || sanitizedValue.length > 19) {
      return { invalidCreditCard: true };
    }

    // Aplicar el algoritmo de Luhn para verificar la validez del número de tarjeta
    let sum = 0;
    let doubleDigit = false;

    for (let i = sanitizedValue.length - 1; i >= 0; i--) {
      let digit = parseInt(sanitizedValue.charAt(i), 10);

      if (doubleDigit) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }

      sum += digit;
      doubleDigit = !doubleDigit;
    }

    if (sum % 10 !== 0) {
      return { invalidCreditCard: true };
    }

    return null;
  }

  expDateValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;
    // Validación de fecha de vencimiento en formato "MM/YY"
    const expDateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expDateRegex.test(value)) {
      return { invalidExpDate: true };
    }
    const currentDate = new Date();
    const [month, year] = value.split('/').map(Number);
    // Verifica si la fecha de vencimiento es posterior al mes y año actuales
    if (
      year < currentDate.getFullYear() % 100 ||
      (year === currentDate.getFullYear() % 100 &&
        month < currentDate.getMonth() + 1)
    ) {
      return { expiredExpDate: true };
    }
    return null;
  }

  cvcValidator(control: AbstractControl): { [key: string]: any } | null {
    const value = control.value;

    // Verificar si el CVC consiste solo en dígitos
    if (!/^\d+$/.test(value)) {
      return { invalidCvc: true };
    }

    // Verificar la longitud válida para CVC (generalmente 3 o 4 dígitos)
    if (value.length !== 3 && value.length !== 4) {
      return { invalidCvc: true };
    }

    return null;
  }

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.userService.getUserShippingAddresses().subscribe((data: any) => {
        this.shippingAddressList = data;
      })
    );

    const cartId = localStorage.getItem('cart_id');

    if (cartId) {
      this.subscription.add(
        this.cartService.getCart(cartId).subscribe(
          (data: any) => {
            this.targetCart = data;
            this.loading = false;
          },
          (error) => {
            this.loading = false;
          }
        )
      );
    } else {
      this.loading = false;
    }
  }

  checkout(): void {
    this.submited = true;

    if (this.form.invalid) {
      return;
    }

    this.disableForm = true;

    let expDate = this.form.value.expDate;

    let parts = expDate.split('/'); // Dividir la fecha en dos partes usando la barra como separador

    let expMonth = parts[0];
    let expYear = parts[1];

    const body: any = {
      cartId: this.targetCart?.id,
      cardNumber: this.form.value.cardNumber,
      expMonth: expMonth,
      expYear: expYear,
      cvc: this.form.value.cvc,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      country: this.form.value.country,
      city: this.form.value.city,
      postalCode: this.form.value.postalCode,
      address: this.form.value.address,
      contactPhone: this.form.value.contactPhone,
    };

    this.subscription.add(
      this.orderService.createOrder(body).subscribe({
        next: (data: any) => {
          const translatedMessage = this.translate.instant(
            'message.success.orderCreated'
          );
          Swal.fire({
            icon: 'success',
            text: translatedMessage,
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 1500,
          });
          this.router.navigateByUrl('/account/orders');
        },
        error: (event: HttpErrorResponse) => {
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
            this.disableForm = false;
          }, 1000);
        },
      })
    );
  }

  autocompleteAddressForm(selectedShippingAddress: ShippingAddress): void {
    this.selectedShippindAddress = selectedShippingAddress;
    this.form.patchValue({
      firstName: selectedShippingAddress.firstName,
      lastName: selectedShippingAddress.lastName,
      country: selectedShippingAddress.country,
      city: selectedShippingAddress.city,
      postalCode: selectedShippingAddress.postalCode,
      address: selectedShippingAddress.address,
      contactPhone: selectedShippingAddress.contactPhone,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
