import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private API_URL: string;
  private ENDPOINT: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
    this.ENDPOINT = '/api/v1/cart';
  }

  getCart(cartId: string): Observable<any> {
    return this.http.get<any>(this.API_URL + this.ENDPOINT + '/' + cartId);
  }

  newCart(): Observable<any> {
    return this.http.post<any>(this.API_URL + this.ENDPOINT, {});
  }

  addToCart(
    cartId: string,
    sizeColorProductVariantId: string
  ): Observable<any> {
    const body = {
      sizeColorProductVariantId,
    };
    return this.http.patch<any>(
      this.API_URL + this.ENDPOINT + '/' + cartId,
      body
    );
  }

  deleteCartItem(cartItemId: string): Observable<any> {
    return this.http.delete<any>(
      this.API_URL + this.ENDPOINT + '/items/' + cartItemId
    );
  }

  clearCart(cartId: string): Observable<any> {
    return this.http.delete<any>(
      this.API_URL + this.ENDPOINT + '/' + cartId + '/items'
    );
  }
}
