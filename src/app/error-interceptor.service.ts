import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {BackendServices} from './backend-services';
import {catchError} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class ErrorInterceptorService implements HttpInterceptor {
  constructor(private backendService: BackendServices) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        err.error = {
          message: 'Invalid Credentials'
        };
      }
      if (err.error !== undefined) {
        const error = err.error.message || err.statusText;
        if (error !== null) {
          return throwError(error);
        }

        return throwError(err);
      }
    }));
  }
}

