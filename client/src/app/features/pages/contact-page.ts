import { Component } from '@angular/core';
import { AdBanner } from '../../shared/ad-components';

@Component({
  selector: 'app-contact',
  imports: [AdBanner],
  template: `
    <section class="mt-page">
      <div class="mt-container">
        <h1 class="mt-page__title">Contact Us</h1>
        <p class="mt-page__lead">
          Questions, feedback, or tool requests? We'd love to hear from you.
        </p>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">Get in Touch</h2>
          <p class="mt-page__body">
            Email us at <a href="mailto:hello@maaruri.tools">hello@maaruri.tools</a>
            and we'll get back to you as soon as possible.
          </p>
        </div>

        <div class="mt-page__section">
          <h2 class="mt-page__heading">Tool Requests</h2>
          <p class="mt-page__body">
            Looking for a tool we don't have yet? Let us know what you need — we're constantly
            adding new tools based on user requests.
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
export class ContactPage {}
