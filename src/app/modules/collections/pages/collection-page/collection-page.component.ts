import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/core/interfaces/category';
import { ColorProductVariant } from 'src/app/core/interfaces/color-product-variant';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})
export class CollectionPageComponent implements OnInit {
  colorProductVariantList: ColorProductVariant[] = [];
  categorySlugname: string = '';
  targetCategory: Category | null = null;
  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.subscribe((params) => {
        this.categorySlugname = params.get('categorySlugname')!;
        this.loadCollection(this.categorySlugname);
      })
    );
  }

  loadCollection(categorySlugname: string): void {
    this.subscription.add(
      this.categoryService.getCollection(categorySlugname).subscribe(
        (data: any) => {
          this.targetCategory = data;
          this.loadProducts(this.targetCategory!.id);
        },
        (error) => {
          this.router.navigate(['/']);
        }
      )
    );
  }

  loadProducts(categoryId: string): void {
    this.subscription.add(
      this.productService
        .getColorProductVariantByCategoryId(categoryId)
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
