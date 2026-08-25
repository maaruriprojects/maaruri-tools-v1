import { Component } from '@angular/core';
import { AdBanner } from '../../shared/ad-components';

@Component({
  selector: 'app-about',
  imports: [AdBanner],
  template: `
    <section class="mt-page">
      <div class="mt-container">
        <h1 class="mt-page__title">About Maaruri Tools</h1>
        <p class="mt-page__lead">
          Maaruri Tools is a free collection of online utility tools — calculators, converters,
          timers, and more — designed to be fast, private, and easy to use.
        </p>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">Our Mission</h2>
          <p class="mt-page__body">
            We believe simple tools should be accessible to everyone. No downloads, no signups,
            no clutter — just open a page and get your answer. Every tool runs entirely in your
            browser, so your data never leaves your device.
          </p>
        </div>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">What We Offer</h2>
          <ul class="mt-page__list">
            <li>11 tool categories covering time, health, finance, productivity, and more</li>
            <li>Real-time results with no page reloads</li>
            <li>Mobile-friendly design that works on any device</li>
            <li>Privacy-first — your inputs stay in your browser</li>
          </ul>
        </div>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">Contact</h2>
          <p class="mt-page__body">
            Have a suggestion or found a bug? Visit our <a routerLink="/contact">contact page</a>
            and let us know.
          </p>
        </div>
      </div>
    </section>
    <app-ad-banner slot="0000000000" />
  `,
  styles: [`
    .mt-page { padding: var(--mt-space-8) var(--mt-space-5) var(--mt-space-10); }
    .mt-page__title { font-size: var(--mt-text-3xl); font-weight: var(--mt-font-bold); color: var(--mt-heading); margin: 0 0 var(--mt-space-4); }
    .mt-page__lead { font-size: var(--mt-text-lg); color: var(--mt-text-muted); margin: 0 0 var(--mt-space-8); line-height: var(--mt-leading-normal); }
    .mt-page__section { margin-bottom: var(--mt-space-8); }
    .mt-page__heading { font-size: var(--mt-text-xl); font-weight: var(--mt-font-semibold); color: var(--mt-heading); margin: 0 0 var(--mt-space-3); }
    .mt-page__body { font-size: var(--mt-text-base); color: var(--mt-text); line-height: var(--mt-leading-normal); margin: 0; }
    .mt-page__list { padding-left: var(--mt-space-6); margin: 0; display: flex; flex-direction: column; gap: var(--mt-space-2); }
    .mt-page__list li { font-size: var(--mt-text-base); color: var(--mt-text); line-height: var(--mt-leading-normal); }
  `],
})
export class AboutPage {}
