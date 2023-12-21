import { HttpParams } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/core/interfaces/category';
import { ColorProductVariant } from 'src/app/core/interfaces/color-product-variant';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-collection-page',
  templateUrl: './collection-page.component.html',
  styleUrls: ['./collection-page.component.scss'],
})
export class CollectionPageComponent implements OnInit, OnDestroy {
  colorProductVariantList: ColorProductVariant[] = [];
  categorySlugname: string = '';
  targetCategory?: Category;
  pageQueryParam: number = 1;
  rowsPerPage: number = 8;
  totalRecords: number = 0;

  private subscription: Subscription = new Subscription();

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap
        .pipe(
          switchMap((params) => {
            this.categorySlugname = params.get('categorySlugname')!;
            return this.route.queryParams;
          }),
          switchMap((queryParams) => {
            this.pageQueryParam = queryParams['page'] || 1;

            return this.categoryService.getCollection(this.categorySlugname);
          })
        )
        .subscribe(
          (data: any) => {
            this.targetCategory = data;

            const customParams = new HttpParams()
              .set('page', this.pageQueryParam - 1)
              .set('size', this.rowsPerPage);

            this.loadColorProductVariants(
              this.targetCategory!.id,
              customParams
            );
          },
          (error) => {
            this.router.navigate(['/']);
          }
        )
    );
  }

  loadColorProductVariants(categoryId: string, params: HttpParams): void {
    this.subscription.add(
      this.productService
        .getColorProductVariantsByCategoryId(categoryId, params)
        .subscribe(
          (data: any) => {
            this.colorProductVariantList = data.content;
            this.totalRecords = data.totalElements;

            console.log(data);
          },
          (error) => {
            this.colorProductVariantList = [];
          }
        )
    );
  }

  onPageChange(event: any): void {
    const queryParams = { page: event.page + 1 };
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
