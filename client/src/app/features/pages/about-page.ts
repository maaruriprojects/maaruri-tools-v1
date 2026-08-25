import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../../core/seo/seo.service';
import { AdBanner } from '../../shared/ad-components/ad-banner';

@Component({
  selector: 'app-about',
  imports: [RouterLink, AdBanner],
  template: `
    <section class="mt-about">
      <div class="mt-container">
        <!-- Hero -->
        <div class="mt-about__hero">
          <h1 class="mt-about__title">About Maaruri Tools</h1>
          <p class="mt-about__lead">
            Free online utility tools — calculators, converters, timers, and more —
            built to be fast, private, and effortless.
          </p>
        </div>

        <!-- Who We Are -->
        <div class="mt-about__section mt-card">
          <div class="mt-about__section-icon">👥</div>
          <h2 class="mt-about__section-title">Who We Are</h2>
          <p class="mt-about__placeholder">
            [Placeholder — replace with your company story.] Maaruri Tools is a free
            collection of online utility tools created to make everyday tasks simpler.
            We are a small team passionate about building clean, fast, and privacy-first
            web tools that work for everyone, on any device.
          </p>
        </div>

        <!-- What We Offer -->
        <div class="mt-about__section mt-card">
          <div class="mt-about__section-icon">🧰</div>
          <h2 class="mt-about__section-title">What We Offer</h2>
          <p class="mt-about__placeholder">
            [Placeholder — replace with your offering description.] We offer a growing
            collection of free online tools across 11 categories:
          </p>
          <ul class="mt-about__list">
            <li>Time &amp; Date tools — digital clock, analog clock, age calculator</li>
            <li>Health &amp; Fitness — BMI calculator, water intake calculator</li>
            <li>Finance &amp; Money — auto loan calculator and more</li>
            <li>Work &amp; Productivity — auto mouse mover and more</li>
            <li>Converters, everyday utilities, and new categories arriving regularly</li>
          </ul>
          <p class="mt-about__placeholder">
            Every tool runs entirely in your browser — no signup, no download, no data
            sent to a server.
          </p>
        </div>

        <!-- Mission -->
        <div class="mt-about__section mt-card">
          <div class="mt-about__section-icon">🎯</div>
          <h2 class="mt-about__section-title">Our Mission</h2>
          <p class="mt-about__placeholder">
            [Placeholder — replace with your mission statement.] Our mission is to make
            simple tools accessible to everyone, free of charge, without ads getting in
            the way of utility. We believe the web should be a place where anyone can
            open a page and get an answer instantly — without barriers, without tracking,
            and without compromise.
          </p>
        </div>

        <!-- CTA -->
        <div class="mt-about__cta">
          <p class="mt-about__cta-text">Have a question or tool request?</p>
          <a class="mt-about__cta-btn" routerLink="/contact">Get in Touch</a>
        </div>
      </div>
    </section>
    <app-ad-banner slot="0000000000" />
  `,
  styles: [`
    .mt-about {
      padding: var(--mt-space-8) var(--mt-space-5) var(--mt-space-10);
    }
    .mt-about__hero {
      text-align: center;
      max-width: 640px;
      margin: 0 auto var(--mt-space-8);
    }
    .mt-about__title {
      font-size: var(--mt-text-3xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
      margin: 0 0 var(--mt-space-4);
    }
    .mt-about__lead {
      font-size: var(--mt-text-lg);
      color: var(--mt-text-muted);
      line-height: var(--mt-leading-normal);
      margin: 0;
    }
    .mt-about__section {
      max-width: 720px;
      margin: 0 auto var(--mt-space-5);
      padding: var(--mt-space-6);
    }
    .mt-about__section-icon {
      font-size: var(--mt-text-2xl);
      margin-bottom: var(--mt-space-3);
    }
    .mt-about__section-title {
      font-size: var(--mt-text-xl);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-heading);
      margin: 0 0 var(--mt-space-3);
    }
    .mt-about__placeholder {
      font-size: var(--mt-text-base);
      color: var(--mt-text);
      line-height: var(--mt-leading-relaxed);
      margin: 0 0 var(--mt-space-3);
    }
    .mt-about__list {
      padding-left: var(--mt-space-5);
      margin: 0 0 var(--mt-space-3);
      display: flex;
      flex-direction: column;
      gap: var(--mt-space-2);
    }
    .mt-about__list li {
      font-size: var(--mt-text-base);
      color: var(--mt-text);
      line-height: var(--mt-leading-normal);
    }
    .mt-about__cta {
      text-align: center;
      max-width: 720px;
      margin: var(--mt-space-8) auto 0;
      padding: var(--mt-space-6);
      background: var(--mt-primary-50);
      border-radius: var(--mt-radius-lg);
    }
    .mt-about__cta-text {
      font-size: var(--mt-text-base);
      color: var(--mt-text);
      margin: 0 0 var(--mt-space-4);
    }
    .mt-about__cta-btn {
      display: inline-block;
      padding: var(--mt-space-3) var(--mt-space-7);
      background: var(--mt-primary);
      color: #fff;
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-semibold);
      text-decoration: none;
      transition: background var(--mt-transition-fast);
    }
    .mt-about__cta-btn:hover {
      background: var(--mt-primary-700);
    }
  `],
})
export class AboutPage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'About Us — Maaruri Tools',
      description:
        'Learn about Maaruri Tools — a free collection of online utility tools built to be fast, private, and easy to use. Our mission, what we offer, and who we are.',
      url: typeof window !== 'undefined' ? window.location.href : '/about',
      keywords: 'about maaruri tools, free online tools, utility tools, our mission, who we are',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About Maaruri Tools',
        description:
          'Free online utility tools — calculators, converters, timers, and more — built to be fast, private, and effortless.',
        url: typeof window !== 'undefined' ? window.location.href : '/about',
      },
    });
  }

  ngOnDestroy(): void {
    this.seo.setPage({
      title: 'Maaruri Tools — Free Online Utility Tools',
      url: typeof window !== 'undefined' ? window.location.href : '/',
    });
  }
}
