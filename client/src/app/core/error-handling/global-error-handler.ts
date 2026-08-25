import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler extends ErrorHandler {
  override handleError(error: unknown): void {
    const message = error instanceof Error ? error.message : String(error);
    if (typeof console !== 'undefined') {
      console.error('Unhandled error:', message, error);
    }
  }
}
