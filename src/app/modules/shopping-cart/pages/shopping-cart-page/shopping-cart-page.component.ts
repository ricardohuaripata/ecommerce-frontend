import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Cart } from 'src/app/core/interfaces/cart';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-shopping-cart-page',
  templateUrl: './shopping-cart-page.component.html',
  styleUrls: ['./shopping-cart-page.component.scss'],
})
export class ShoppingCartPageComponent implements OnInit, OnDestroy {
  targetCart?: Cart;
  loading: boolean = true;
  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private cartService: CartService
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use(
      sessionStorage.getItem('lang') || this.translate.getDefaultLang()
    );
  }

  ngOnInit(): void {
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
    this.subscription.add(
      this.cartService.deleteCartItem(cartItemId).subscribe(
        (data: any) => {
          this.targetCart = data;
        },
        (error) => {}
      )
    );
  }

  clearCart(): void {
    this.subscription.add(
      this.cartService.clearCart(this.targetCart!.id).subscribe(
        (data: any) => {
          this.targetCart = data;
        },
        (error) => {}
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
