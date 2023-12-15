import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ColorProductVariant } from 'src/app/core/interfaces/color-product-variant';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})
export class CollectionPageComponent implements OnInit {
  colorProductVariantList: ColorProductVariant[] = [];
  categorySlugname!: string | null;
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        this.categorySlugname = params.get('categorySlugname') ?? '';
        this.getProducts(this.categorySlugname);
      })
    );
  }

  getProducts(categorySlugname: string): void {
    this.subscription.add(
      this.productService
        .getColorProductVariantByCategorySlugname(categorySlugname)
        .subscribe(
          (data: any) => {
            this.colorProductVariantList = data.content;
            console.log(this.colorProductVariantList);
          },
          (error) => {
            this.colorProductVariantList = [];
          }
        )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
