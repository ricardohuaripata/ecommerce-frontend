import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string;
  private ENDPOINT: string;

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
    this.ENDPOINT = '/api/v1/auth';
  }

  login(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + this.ENDPOINT + '/login', body, { observe: 'response' });
  }

  register(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + this.ENDPOINT + '/signup', body);
  }
}
