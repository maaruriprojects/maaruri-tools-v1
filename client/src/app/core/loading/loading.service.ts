import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private readonly _isLoading = signal<boolean>(false);
  private activeRequests = 0;

  readonly isLoading = this._isLoading.asReadonly();

  start(): void {
    this.activeRequests++;
    this._isLoading.set(true);
  }

  stop(): void {
    if (this.activeRequests > 0) {
      this.activeRequests--;
    }
    if (this.activeRequests === 0) {
      this._isLoading.set(false);
    }
  }

  reset(): void {
    this.activeRequests = 0;
    this._isLoading.set(false);
  }
}
