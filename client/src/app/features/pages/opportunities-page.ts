import { Component } from '@angular/core';
import { AdBanner } from '../../shared/ad-components';

@Component({
  selector: 'app-opportunities',
  imports: [AdBanner],
  template: `
    <section class="mt-page">
      <div class="mt-container">
        <h1 class="mt-page__title">Opportunities</h1>
        <p class="mt-page__lead">
          Partner with us, advertise on Maaruri Tools, or contribute new tools.
        </p>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">Advertising</h2>
          <p class="mt-page__body">
            Maaruri Tools reaches users looking for quick, practical online tools. We offer
            banner, rectangle, and in-article ad placements across all tool pages.
            Contact us at <a href="mailto:ads@maaruri.tools">ads@maaruri.tools</a> for rates.
          </p>
        </div>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">Partnerships</h2>
          <p class="mt-page__body">
            We're open to partnerships with tool developers, content creators, and platforms
            that share our mission of making simple tools accessible to everyone.
          </p>
        </div>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">Contribute</h2>
          <p class="mt-page__body">
            Have an idea for a new tool? Want to contribute to the project? Reach out at
            <a href="mailto:hello@maaruri.tools">hello@maaruri.tools</a>.
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
  `],
})
export class OpportunitiesPage {}
