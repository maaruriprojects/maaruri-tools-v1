import { Component, inject } from '@angular/core';
import { LoadingService } from '../../core/loading/loading.service';

@Component({
  selector: 'app-loading-spinner',
  template: `
    @if (loadingService.isLoading()) {
      <div class="mt-loading-overlay" role="status" aria-live="polite">
        <div class="mt-loading-overlay__backdrop"></div>
        <div class="mt-loading-overlay__spinner">
          <div class="mt-loading-spinner">
            <div class="mt-loading-spinner__ring"></div>
          </div>
          <p class="mt-loading-overlay__text">Loading…</p>
        </div>
      </div>
    }
  `,
  styles: [`
    .mt-loading-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .mt-loading-overlay__backdrop {
      position: absolute;
      inset: 0;
      background: rgba(15, 23, 42, 0.15);
      opacity: 0;
      animation: mt-loading-fade-in 200ms ease forwards;
    }
    .mt-loading-overlay__spinner {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .mt-loading-spinner {
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mt-loading-spinner__ring {
      width: 36px;
      height: 36px;
      border: 3px solid var(--mt-primary-100);
      border-top-color: var(--mt-primary-600);
      border-radius: 50%;
      animation: mt-loading-spin 700ms linear infinite;
    }
    .mt-loading-overlay__text {
      font-size: 14px;
      font-weight: 500;
      color: var(--mt-primary-700);
      margin: 0;
    }
    @keyframes mt-loading-spin {
      to { transform: rotate(360deg); }
    }
    @keyframes mt-loading-fade-in {
      to { opacity: 1; }
    }
  `],
})
export class LoadingSpinner {
  readonly loadingService = inject(LoadingService);
}
