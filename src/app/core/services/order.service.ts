import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private API_URL: string;
  private ENDPOINT: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
    this.ENDPOINT = '/api/v1/order';
  }

  createOrder(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + this.ENDPOINT, body);
  }

  getUserOrders(): Observable<any> {
    return this.http.get<any>(this.API_URL + this.ENDPOINT);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(this.API_URL + this.ENDPOINT + '/' + orderId);
  }
}
