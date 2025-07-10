import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${accessToken}` }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Access token expired
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(tokens => {
              const newReq = req.clone({
                setHeaders: { Authorization: `Bearer ${tokens.accessToken}` }
              });
              return next.handle(newReq);
            }),
            catchError(err => {
              debugger;
              console.log('Error in refresh logic',err)
              this.authService.logout(); // if refresh also fails, logout
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
    }
}
