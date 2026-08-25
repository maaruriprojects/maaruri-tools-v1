import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { LoadingService } from '../loading/loading.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const loadingService = inject(LoadingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      loadingService.stop();

      if (error.status === 404) {
        router.navigate(['/404']);
      } else if (error.status === 0) {
        console.error('Network error:', error.message);
      } else {
        console.error(`HTTP ${error.status}:`, error.message);
      }

      return throwError(() => error);
    }),
  );
};
