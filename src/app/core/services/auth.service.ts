import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL: string;
  private ENDPOINT: string;
  private jwtService = new JwtHelperService();

  constructor(private http: HttpClient) {
    this.API_URL = environment.API_URL;
    this.ENDPOINT = '/api/v1/auth';
  }

  login(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + this.ENDPOINT + '/login', body, {
      observe: 'response',
    });
  }

  register(body: any): Observable<any> {
    return this.http.post<any>(this.API_URL + this.ENDPOINT + '/signup', body);
  }

  forgotPassword(body: any): Observable<any> {
    return this.http.post<any>(
      this.API_URL + this.ENDPOINT + '/forgot-password',
      body
    );
  }

  resetPassword(resetPasswordToken: string, body: any): Observable<any> {
    return this.http.post<any>(
      this.API_URL + this.ENDPOINT + '/reset-password/' + resetPasswordToken,
      body
    );
  }

  validateTokenFromCache(): boolean {
    const jwtToken = localStorage.getItem('auth_token');

    if (jwtToken && jwtToken !== '') {
      try {
        const decodedToken = this.jwtService.decodeToken(jwtToken);

        if (
          decodedToken &&
          decodedToken.sub &&
          !this.jwtService.isTokenExpired(jwtToken)
        ) {
          return true;
        }
      } catch (error) {
        localStorage.removeItem('auth_token');
        return false;
      }
    }
    return false;
  }
}
