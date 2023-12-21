import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL: string;
  private ENDPOINT_1: string;
  private ENDPOINT_2: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
    this.ENDPOINT_1 = '/api/v1/color-product-variant';
    this.ENDPOINT_2 = '/api/v1/size-color-product-variant';
  }

  getColorProductVariantsByCategoryId(
    categoryId: string,
    params: HttpParams
  ): Observable<any> {
    return this.http.get<any>(
      this.API_URL + this.ENDPOINT_1 + '/category/id/' + categoryId,
      { params }
    );
  }

  getColorProductVariantsByProductSlugname(
    productSlugname: string
  ): Observable<any> {
    return this.http.get<any>(
      this.API_URL + this.ENDPOINT_1 + '/product/slug/' + productSlugname
    );
  }

  getSizeColorProductVariantsByColorProductVariantId(
    colorProductVariantId: string
  ): Observable<any> {
    return this.http.get<any>(
      this.API_URL +
        this.ENDPOINT_2 +
        '/colorProductVariant/' +
        colorProductVariantId
    );
  }
}
