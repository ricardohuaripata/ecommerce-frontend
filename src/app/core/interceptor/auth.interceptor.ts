import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';

import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/shared/services/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private errorService: ErrorService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const jwtToken = localStorage.getItem('auth_token');

    if (jwtToken) {
      console.log('Interceptando el token para la peticion, Token: ' + jwtToken);
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + jwtToken },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this.errorService.msgError(error);
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
