import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ColorProductVariant } from 'src/app/core/interfaces/color-product-variant';
import { SizeColorProductVariant } from 'src/app/core/interfaces/size-color-product-variant';
import { ProductService } from 'src/app/core/services/product.service';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/core/services/cart.service';

import { MessageService } from 'primeng/api';
import { LanguageService } from 'src/app/core/services/language.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
  providers: [MessageService],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productSlugname: string = '';
  colorQueryParam: string = '';
  targetColorProductVariant?: ColorProductVariant;
  colorProductVariantList: ColorProductVariant[] = [];
  sizeColorProductVariantList: SizeColorProductVariant[] = [];
  disableAddToCartButton = true;
  buttonCooldown = false;
  selectedSizeVariant?: SizeColorProductVariant; // variante talla-color seleccionado

  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService,
    private languageService: LanguageService
  ) {}

  ngOnInit(): void {
    this.translate.use(this.languageService.currentLanguage);
    this.languageService.currentLanguageSubject.subscribe((lang) => {
      this.translate.use(lang);
    });

    this.subscription.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            this.productSlugname = params.get('productSlugname')!;
            return this.route.queryParams;
          }),
          switchMap((queryParams) => {
            this.colorQueryParam = queryParams['color'] || '';

            return this.productService.getColorProductVariantsByProductSlugname(
              this.productSlugname
            );
          })
        )
        .subscribe(
          (data: any) => {
            if (data.length > 0) {
              this.colorProductVariantList = data;
              console.log(this.colorProductVariantList);

              // Encuentra el objeto en this.colorProductVariantList donde colorProductVariant.color.title coincide con this.color
              const foundColorVariant = this.colorProductVariantList.find(
                (colorProductVariant) =>
                  colorProductVariant.color.slug === this.colorQueryParam
              );

              if (foundColorVariant) {
                this.targetColorProductVariant = foundColorVariant;
              } else {
                console.log(
                  'No se encontró ningún variante con el color especificado:',
                  this.colorQueryParam
                );
                this.targetColorProductVariant =
                  this.colorProductVariantList[0];
              }

              this.subscription.add(
                this.productService
                  .getSizeColorProductVariantsByColorProductVariantId(
                    this.targetColorProductVariant!.id
                  )
                  .subscribe(
                    (data: any) => {
                      this.sizeColorProductVariantList = data;
                      // Controlar que el usuario esta añadiendo a la cesta el mismo articulo que ve en pantalla
                      if (
                        this.targetColorProductVariant?.id ==
                        this.selectedSizeVariant?.colorProductVariant.id
                      ) {
                        this.disableAddToCartButton = false;
                      } else {
                        this.disableAddToCartButton = true;
                      }

                      console.log(this.sizeColorProductVariantList);
                      console.log(this.targetColorProductVariant);
                    },
                    (error) => {
                      this.router.navigate(['/']);
                    }
                  )
              );
            } else {
              this.router.navigate(['/']);
            }
          },
          (error) => {
            this.router.navigate(['/']);
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addToCart(): void {
    this.buttonCooldown = true;

    const cartId = localStorage.getItem('cart_id');

    if (cartId) {
      this.subscription.add(
        this.cartService
          .addToCart(cartId, this.selectedSizeVariant!.id)
          .subscribe(
            (data: any) => {
              this.messageService.add({
                severity: 'success',
                detail: 'Item added to cart.',
              });

              setTimeout(() => {
                this.buttonCooldown = false;
              }, 1000);
            },
            (event) => {
              if (
                event.error.statusCode === 404 ||
                event.error.statusCode === 500
              ) {
                this.addToNewCart();
              } else {
                this.messageService.add({
                  severity: 'error',
                  detail: event.error.message,
                });
                setTimeout(() => {
                  this.buttonCooldown = false;
                }, 1000);
              }
            }
          )
      );
    } else {
      this.addToNewCart();
    }
  }

  addToNewCart(): void {
    this.subscription.add(
      this.cartService.newCart().subscribe(
        (data: any) => {
          localStorage.setItem('cart_id', data.id);

          this.subscription.add(
            this.cartService
              .addToCart(data.id, this.selectedSizeVariant!.id)
              .subscribe(
                (data: any) => {
                  this.messageService.add({
                    severity: 'success',
                    detail: 'Item added to cart.',
                  });
                  setTimeout(() => {
                    this.buttonCooldown = false;
                  }, 1000);
                },
                (error) => {}
              )
          );
        },
        (error) => {}
      )
    );
  }

  selectSize(selectedSizeVariant: SizeColorProductVariant): void {
    this.selectedSizeVariant = selectedSizeVariant;
    this.disableAddToCartButton = false;
    console.log(this.selectedSizeVariant);
  }
}
