import {
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { ErrorDialogService } from '../services/error-dialog.service';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private errorDialogService: ErrorDialogService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => { },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (!(err.status === 401 && (err.message === ''))) {
              if (this.errorDialogService !== undefined) {
                console.log('error',err)
                this.errorDialogService.openDialog(
                  err?.error ? err?.error : err?.status === 404 ? 'City not found' : 'Undefined client error'
                );
              }
            }
          }
        }
      )
    );
  }
}
