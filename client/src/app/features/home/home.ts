import { Component, inject } from '@angular/core';
import { AppConfigService } from '../../core/config/app-config.service';

@Component({
  selector: 'app-home',
  imports: [],
  template: `
    <section class="mt-home">
      <div class="mt-container">
        <div class="mt-home__hero">
          <h1 class="mt-home__title">{{ siteName }}</h1>
          <p class="mt-home__subtitle">Free online utility tools — calculators, converters, timers and more.</p>
          <p class="mt-home__hint">Header, search, and country selector are ready. More pages coming soon.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .mt-home {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: var(--mt-space-10) var(--mt-space-5);
    }
    .mt-home__hero {
      text-align: center;
      max-width: 600px;
    }
    .mt-home__title {
      font-size: var(--mt-text-5xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
      margin: 0 0 var(--mt-space-4);
    }
    .mt-home__subtitle {
      font-size: var(--mt-text-xl);
      color: var(--mt-text-muted);
      margin: 0 0 var(--mt-space-5);
    }
    .mt-home__hint {
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
    }
  `],
})
export class Home {
  readonly siteName = inject(AppConfigService).siteName;
}
