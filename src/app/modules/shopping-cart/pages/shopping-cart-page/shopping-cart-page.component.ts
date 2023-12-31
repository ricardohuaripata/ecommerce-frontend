import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart';
import { CartService } from 'src/app/core/services/cart.service';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  targetCart?: Cart;
  loading: boolean = true;
  processing: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private cartService: CartService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    const cartId = localStorage.getItem('cart_id');

    if (cartId) {
      this.subscription.add(
        this.cartService.getCart(cartId).subscribe(
          (data: any) => {
            this.targetCart = data;
            this.loading = false;
            console.log(data);
          },
          (error) => {
            this.newCart();
          }
        )
      );
    } else {
      this.newCart();
    }
  }

  newCart(): void {
    this.subscription.add(
      this.cartService.newCart().subscribe(
        (data: any) => {
          localStorage.setItem('cart_id', data.id);
          this.targetCart = data;
          this.loading = false;
          console.log('Nuevo carrito creado con id: ' + this.targetCart!.id);
        },
        (error) => {}
      )
    );
  }

  removeFromCart(cartItemId: string): void {
    if (this.processing) {
      return;
    }
    this.processing = true;
    this.subscription.add(
      this.cartService.deleteCartItem(cartItemId).subscribe(
        (data: any) => {
          this.targetCart = data;
          this.processing = false;
        },
        (error) => {}
      )
    );
  }

  clearCart(): void {
    if (this.processing) {
      return;
    }
    this.processing = true;
    this.subscription.add(
      this.cartService.clearCart(this.targetCart!.id).subscribe(
        (data: any) => {
          this.targetCart = data;
          this.processing = false;
        },
        (error) => {}
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
