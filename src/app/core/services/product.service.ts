import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private API_URL: string;
  private ENDPOINT: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
    this.ENDPOINT = '/api/v1/color-product-variant';
  }

  getColorProductVariantByCategorySlugname(
    categorySlugname: string
  ): Observable<any> {
    return this.http.get<any>(
      this.API_URL + this.ENDPOINT + '/category/slug/' + categorySlugname
    );
  }
}
