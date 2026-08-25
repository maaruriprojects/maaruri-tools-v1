import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <section class="mt-not-found">
      <div class="mt-container">
        <div class="mt-not-found__inner">
          <div class="mt-not-found__code">404</div>
          <h1 class="mt-not-found__title">Page Not Found</h1>
          <p class="mt-not-found__text">
            The page you're looking for doesn't exist or may have been moved.
          </p>
          <div class="mt-not-found__actions">
            <a class="mt-not-found__btn mt-not-found__btn--primary" routerLink="/">Back to Home</a>
            <a class="mt-not-found__btn mt-not-found__btn--secondary" routerLink="/contact">Contact Us</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .mt-not-found {
      padding: var(--mt-space-10) var(--mt-space-5);
      min-height: 60vh;
      display: flex;
      align-items: center;
    }
    .mt-not-found__inner {
      text-align: center;
      max-width: 480px;
      margin: 0 auto;
    }
    .mt-not-found__code {
      font-size: var(--mt-text-5xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-200);
      line-height: 1;
      margin-bottom: var(--mt-space-4);
    }
    .mt-not-found__title {
      font-size: var(--mt-text-2xl);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-heading);
      margin: 0 0 var(--mt-space-3);
    }
    .mt-not-found__text {
      font-size: var(--mt-text-base);
      color: var(--mt-text-muted);
      line-height: var(--mt-leading-normal);
      margin: 0 0 var(--mt-space-6);
    }
    .mt-not-found__actions {
      display: flex;
      gap: var(--mt-space-3);
      justify-content: center;
      flex-wrap: wrap;
    }
    .mt-not-found__btn {
      display: inline-block;
      padding: var(--mt-space-3) var(--mt-space-6);
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-semibold);
      text-decoration: none;
      transition: background var(--mt-transition-fast), transform var(--mt-transition-fast);
    }
    .mt-not-found__btn--primary {
      background: var(--mt-primary);
      color: #fff;
    }
    .mt-not-found__btn--primary:hover {
      background: var(--mt-primary-700);
      transform: translateY(-1px);
    }
    .mt-not-found__btn--secondary {
      background: transparent;
      color: var(--mt-primary-700);
      border: 1px solid var(--mt-primary-300);
    }
    .mt-not-found__btn--secondary:hover {
      background: var(--mt-primary-50);
    }
  `],
})
export class NotFoundPage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Page Not Found — Maaruri Tools',
      description: 'The page you are looking for does not exist.',
      url: typeof window !== 'undefined' ? window.location.href : '/404',
    });
  }

  ngOnDestroy(): void {
    this.seo.setPage({
      title: 'Maaruri Tools — Free Online Utility Tools',
      url: typeof window !== 'undefined' ? window.location.href : '/',
    });
  }
}
