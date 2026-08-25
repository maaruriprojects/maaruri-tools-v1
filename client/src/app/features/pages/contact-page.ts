import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { SeoService } from '../../core/seo/seo.service';
import { AdBanner } from '../../shared/ad-components/ad-banner';

@Component({
  selector: 'app-contact',
  imports: [FormsModule, AdBanner],
  template: `
    <section class="mt-contact">
      <div class="mt-container">
        <div class="mt-contact__hero">
          <h1 class="mt-contact__title">Contact Us</h1>
          <p class="mt-contact__lead">
            Questions, feedback, or tool requests? We'd love to hear from you.
          </p>
        </div>

        <div class="mt-contact__layout">
          <!-- Form -->
          <div class="mt-contact__form-wrap mt-card">
            @if (submitted()) {
              <div class="mt-contact__success">
                <div class="mt-contact__success-icon">✓</div>
                <h2 class="mt-contact__success-title">Message Sent!</h2>
                <p class="mt-contact__success-text">
                  Thanks for reaching out. We'll get back to you as soon as possible.
                </p>
                <button class="mt-contact__success-btn" (click)="reset()">Send Another Message</button>
              </div>
            } @else {
              <form #contactForm="ngForm" (ngSubmit)="onSubmit(contactForm)" novalidate>
                <div class="mt-contact__field">
                  <label for="name">Name <span class="mt-contact__required">*</span></label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    [(ngModel)]="model.name"
                    #name="ngModel"
                    required
                    placeholder="Your name"
                    [class.mt-contact__input--error]="name.invalid && name.touched"
                  />
                  @if (name.invalid && name.touched) {
                    <span class="mt-contact__error">Please enter your name.</span>
                  }
                </div>

                <div class="mt-contact__field">
                  <label for="email">Email <span class="mt-contact__required">*</span></label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    [(ngModel)]="model.email"
                    #email="ngModel"
                    required
                    email
                    placeholder="you@example.com"
                    [class.mt-contact__input--error]="email.invalid && email.touched"
                  />
                  @if (email.invalid && email.touched) {
                    @if (email.errors?.['required']) {
                      <span class="mt-contact__error">Please enter your email address.</span>
                    } @else {
                      <span class="mt-contact__error">Please enter a valid email address.</span>
                    }
                  }
                </div>

                <div class="mt-contact__field">
                  <label for="message">Message <span class="mt-contact__required">*</span></label>
                  <textarea
                    id="message"
                    name="message"
                    [(ngModel)]="model.message"
                    #message="ngModel"
                    required
                    rows="5"
                    placeholder="Tell us what's on your mind..."
                    [class.mt-contact__input--error]="message.invalid && message.touched"
                  ></textarea>
                  @if (message.invalid && message.touched) {
                    <span class="mt-contact__error">Please enter a message.</span>
                  }
                </div>

                <button
                  type="submit"
                  class="mt-contact__submit"
                  [disabled]="contactForm.invalid"
                >
                  Send Message
                </button>
              </form>
            }
          </div>

          <!-- Side info -->
          <aside class="mt-contact__aside">
            <div class="mt-contact__info-card mt-card">
              <h3 class="mt-contact__info-title">Other Ways to Reach Us</h3>
              <p class="mt-contact__info-text">
                Email us directly at
                <a href="mailto:hello@maaruri.tools">hello@maaruri.tools</a>
                and we'll respond within 1-2 business days.
              </p>
            </div>
            <div class="mt-contact__info-card mt-card">
              <h3 class="mt-contact__info-title">Tool Requests</h3>
              <p class="mt-contact__info-text">
                Looking for a tool we don't have yet? Let us know what you need — we're
                constantly adding new tools based on user requests.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
    <app-ad-banner slot="0000000000" />
  `,
  styles: [`
    .mt-contact {
      padding: var(--mt-space-8) var(--mt-space-5) var(--mt-space-10);
    }
    .mt-contact__hero {
      text-align: center;
      max-width: 600px;
      margin: 0 auto var(--mt-space-8);
    }
    .mt-contact__title {
      font-size: var(--mt-text-3xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
      margin: 0 0 var(--mt-space-4);
    }
    .mt-contact__lead {
      font-size: var(--mt-text-lg);
      color: var(--mt-text-muted);
      line-height: var(--mt-leading-normal);
      margin: 0;
    }
    .mt-contact__layout {
      display: flex;
      gap: var(--mt-space-6);
      max-width: 880px;
      margin: 0 auto;
    }
    .mt-contact__form-wrap {
      flex: 1;
      min-width: 0;
      padding: var(--mt-space-6);
    }
    .mt-contact__aside {
      width: 280px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-4);
    }
    .mt-contact__field {
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-2);
      margin-bottom: var(--mt-space-5);
    }
    .mt-contact__field label {
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-medium);
      color: var(--mt-heading);
    }
    .mt-contact__required {
      color: var(--mt-error-500);
    }
    .mt-contact__field input,
    .mt-contact__field textarea {
      padding: var(--mt-space-3);
      border: 1px solid var(--mt-border-strong);
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-base);
      font-family: var(--mt-font-sans);
      color: var(--mt-text);
      outline: none;
      resize: vertical;
      transition: border-color var(--mt-transition-fast);
    }
    .mt-contact__field input:focus,
    .mt-contact__field textarea:focus {
      border-color: var(--mt-primary-400);
    }
    .mt-contact__input--error {
      border-color: var(--mt-error-500) !important;
    }
    .mt-contact__error {
      font-size: var(--mt-text-xs);
      color: var(--mt-error-600);
    }
    .mt-contact__submit {
      width: 100%;
      padding: var(--mt-space-3) var(--mt-space-6);
      background: var(--mt-primary);
      color: #fff;
      border: none;
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-base);
      font-weight: var(--mt-font-semibold);
      cursor: pointer;
      transition: background var(--mt-transition-fast);
    }
    .mt-contact__submit:hover:not(:disabled) {
      background: var(--mt-primary-700);
    }
    .mt-contact__submit:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    .mt-contact__success {
      text-align: center;
      padding: var(--mt-space-8) var(--mt-space-4);
    }
    .mt-contact__success-icon {
      width: 56px;
      height: 56px;
      margin: 0 auto var(--mt-space-4);
      border-radius: 50%;
      background: var(--mt-success-50);
      color: var(--mt-success-600);
      font-size: var(--mt-text-2xl);
      font-weight: var(--mt-font-bold);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .mt-contact__success-title {
      font-size: var(--mt-text-xl);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-heading);
      margin: 0 0 var(--mt-space-2);
    }
    .mt-contact__success-text {
      font-size: var(--mt-text-base);
      color: var(--mt-text-muted);
      margin: 0 0 var(--mt-space-5);
    }
    .mt-contact__success-btn {
      padding: var(--mt-space-2) var(--mt-space-5);
      background: var(--mt-primary-50);
      color: var(--mt-primary-700);
      border: 1px solid var(--mt-primary-200);
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-semibold);
      cursor: pointer;
      transition: background var(--mt-transition-fast);
    }
    .mt-contact__success-btn:hover {
      background: var(--mt-primary-100);
    }
    .mt-contact__info-card {
      padding: var(--mt-space-5);
    }
    .mt-contact__info-title {
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-heading);
      margin: 0 0 var(--mt-space-2);
    }
    .mt-contact__info-text {
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
      line-height: var(--mt-leading-normal);
      margin: 0;
    }
    .mt-contact__info-text a {
      color: var(--mt-primary-600);
    }
    @media (max-width: 1023.98px) {
      .mt-contact__layout {
        flex-direction: column;
      }
      .mt-contact__aside {
        width: 100%;
        flex-direction: row;
        flex-wrap: wrap;
      }
      .mt-contact__info-card {
        flex: 1;
        min-width: 240px;
      }
    }
    @media (max-width: 767.98px) {
      .mt-contact__aside {
        flex-direction: column;
      }
    }
  `],
})
export class ContactPage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);
  readonly submitted = signal<boolean>(false);

  model = { name: '', email: '', message: '' };

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Contact Us — Maaruri Tools',
      description:
        'Get in touch with the Maaruri Tools team. Send us your questions, feedback, or tool requests — we respond within 1-2 business days.',
      url: typeof window !== 'undefined' ? window.location.href : '/contact',
      keywords: 'contact maaruri tools, feedback, tool requests, support, email',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact Maaruri Tools',
        description:
          'Get in touch with the Maaruri Tools team for questions, feedback, or tool requests.',
        url: typeof window !== 'undefined' ? window.location.href : '/contact',
      },
    });
  }

  ngOnDestroy(): void {
    this.seo.setPage({
      title: 'Maaruri Tools — Free Online Utility Tools',
      url: typeof window !== 'undefined' ? window.location.href : '/',
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.submitted.set(true);
    }
  }

  reset(): void {
    this.submitted.set(false);
    this.model = { name: '', email: '', message: '' };
  }
}
