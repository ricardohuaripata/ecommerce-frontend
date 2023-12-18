import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { ColorProductVariant } from 'src/app/core/interfaces/color-product-variant';
import { SizeColorProductVariant } from 'src/app/core/interfaces/size-color-product-variant';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TranslateService } from '@ngx-translate/core';
import Swal from 'sweetalert2';
import { CartService } from 'src/app/core/services/cart.service';
import { ErrorService } from 'src/app/shared/services/error.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.scss'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  productSlugname: string = '';
  color: string = '';
  targetColorProductVariant?: ColorProductVariant;
  colorProductVariantList: ColorProductVariant[] = [];
  sizeColorProductVariantList: SizeColorProductVariant[] = [];
  disableAddToCartButton = true;
  selectedSizeVariant?: SizeColorProductVariant; // variante talla-color seleccionado

  private subscription: Subscription = new Subscription();

  constructor(
    private translate: TranslateService,
    private productService: ProductService,
    private cartService: CartService,
    private errorService: ErrorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.translate.addLangs(['es', 'en']);
    this.translate.setDefaultLang('es');
    this.translate.use(
      sessionStorage.getItem('lang') || this.translate.getDefaultLang()
    );
  }

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            this.productSlugname = params.get('productSlugname')!;
            return this.route.queryParams;
          }),
          switchMap((queryParams) => {
            this.color = queryParams['color'] || '';

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
                  colorProductVariant.color.slug === this.color
              );

              if (foundColorVariant) {
                this.targetColorProductVariant = foundColorVariant;
              } else {
                console.log(
                  'No se encontró ningún variante con el color especificado:',
                  this.color
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
    const cartId = localStorage.getItem('cart_id');

    if (cartId) {
      this.subscription.add(
        this.cartService
          .addToCart(cartId, this.selectedSizeVariant!.id)
          .subscribe(
            (data: any) => {
              Swal.fire({
                icon: 'success',
                text: 'Añadido a la cesta',
                showConfirmButton: false,
                allowOutsideClick: false,
                timer: 1500,
              });
            },
            (error) => {
              // this.addToNewCart();

              this.errorService.msgError(error);

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
                  Swal.fire({
                    icon: 'success',
                    text: 'Añadido a la cesta',
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    timer: 1500,
                  });
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
