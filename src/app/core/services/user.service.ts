import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL: string;
  private ENDPOINT: string;
  private loggedUserSource = new BehaviorSubject<User | undefined>(undefined);
  loggedUser$ = this.loggedUserSource.asObservable();

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
    this.ENDPOINT = '/api/v1/user';
  }

  getUserDetails(): Observable<any> {
    return this.http.get<any>(
      this.API_URL + this.ENDPOINT + '/account/details'
    );
  }

  updateLoggedUser(user: User | undefined): void {
    this.loggedUserSource.next(user);
  }

  updateUserPassword(body: any): Observable<any> {
    return this.http.patch<any>(
      this.API_URL + this.ENDPOINT + '/account/password',
      body
    );
  }

  updateUserDetails(body: any): Observable<any> {
    return this.http.patch<any>(
      this.API_URL + this.ENDPOINT + '/account/details',
      body
    );
  }

  updateShippingAddress(shippingAddressId: string, body: any): Observable<any> {
    return this.http.patch<any>(
      this.API_URL +
        this.ENDPOINT +
        '/account/shipping-address/' +
        shippingAddressId,
      body
    );
  }
}
