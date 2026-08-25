import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { SeoService } from '../../core/seo/seo.service';
import { AdBanner } from '../../shared/ad-components/ad-banner';

@Component({
  selector: 'app-opportunities',
  imports: [AdBanner],
  template: `
    <section class="mt-opp">
      <div class="mt-container">
        <!-- Hero -->
        <div class="mt-opp__hero">
          <h1 class="mt-opp__title">Opportunities</h1>
          <p class="mt-opp__lead">
            Partner with us, learn new skills, or showcase your tools to a growing audience.
          </p>
        </div>

        <!-- Coffee CTA -->
        <div class="mt-opp__coffee">
          <div class="mt-opp__coffee-text">
            <h2 class="mt-opp__coffee-title">Support Maaruri Tools</h2>
            <p class="mt-opp__coffee-desc">
              If you find our free tools useful, consider buying us a coffee. Every
              contribution helps us keep the tools free and build new ones.
            </p>
          </div>
          <a
            class="mt-opp__coffee-btn"
            href="https://www.buymeacoffee.com/maaruritools"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="mt-opp__coffee-icon">☕</span>
            Buy a Coffee
          </a>
        </div>

        <!-- Content cards grid -->
        <div class="mt-opp__grid">
          <!-- 1. Students -->
          <div class="mt-opp__card mt-card">
            <div class="mt-opp__card-icon">🎓</div>
            <h2 class="mt-opp__card-title">For Students</h2>
            <p class="mt-opp__card-text">
              Students can use our calculators and converters for free — no signup,
              no limits. Whether you need a BMI calculator for a health class, an
              age calculator for a project, or a word counter for an essay, our tools
              are here to help you learn and save time.
            </p>
            <p class="mt-opp__card-placeholder">
              [Placeholder — add student-specific programs, discounts, or partnership details here.]
            </p>
          </div>

          <!-- 2. How to Start a Startup -->
          <div class="mt-opp__card mt-card">
            <div class="mt-opp__card-icon">🚀</div>
            <h2 class="mt-opp__card-title">How to Start a Startup</h2>
            <p class="mt-opp__card-text">
              Building a tool-based startup? We share our journey of creating
              Maaruri Tools — from choosing the right tech stack to monetizing
              free tools with ads and premium placements. Learn from our wins
              and mistakes.
            </p>
            <p class="mt-opp__card-placeholder">
              [Placeholder — add links to guides, blog posts, or a startup playbook here.]
            </p>
          </div>

          <!-- 3. Who Wants This Kind of Application -->
          <div class="mt-opp__card mt-card">
            <div class="mt-opp__card-icon">🎯</div>
            <h2 class="mt-opp__card-title">Who Wants This Kind of Application</h2>
            <p class="mt-opp__card-text">
              Tool directory sites like Maaruri Tools are valuable for anyone who
              needs quick answers without installing apps — professionals, students,
              freelancers, and small business owners. If you're building a similar
              platform or want to reach this audience, we'd love to connect.
            </p>
            <p class="mt-opp__card-placeholder">
              [Placeholder — describe your target audience or partnership criteria here.]
            </p>
          </div>

          <!-- 4. We Sell Space for Your Tools -->
          <div class="mt-opp__card mt-card">
            <div class="mt-opp__card-icon">🏪</div>
            <h2 class="mt-opp__card-title">We Sell Space for Your Tools</h2>
            <p class="mt-opp__card-text">
              Have a tool you'd like to feature on Maaruri Tools? We offer placement
              slots for third-party tools within our categories. Get your tool in
              front of users who are already looking for utilities like yours.
            </p>
            <p class="mt-opp__card-placeholder">
              [Placeholder — add pricing tiers, placement options, or a contact link here.]
            </p>
            <a
              class="mt-opp__card-btn"
              href="mailto:ads@maaruri.tools?subject=Tool Placement Inquiry"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </section>
    <app-ad-banner slot="0000000000" />
  `,
  styles: [`
    .mt-opp {
      padding: var(--mt-space-8) var(--mt-space-5) var(--mt-space-10);
    }
    .mt-opp__hero {
      text-align: center;
      max-width: 600px;
      margin: 0 auto var(--mt-space-8);
    }
    .mt-opp__title {
      font-size: var(--mt-text-3xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-primary-700);
      margin: 0 0 var(--mt-space-4);
    }
    .mt-opp__lead {
      font-size: var(--mt-text-lg);
      color: var(--mt-text-muted);
      line-height: var(--mt-leading-normal);
      margin: 0;
    }

    /* Coffee CTA */
    .mt-opp__coffee {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--mt-space-6);
      max-width: 720px;
      margin: 0 auto var(--mt-space-8);
      padding: var(--mt-space-6);
      background: linear-gradient(135deg, var(--mt-accent-50) 0%, var(--mt-accent-100) 100%);
      border: 1px solid var(--mt-accent-200);
      border-radius: var(--mt-radius-lg);
    }
    .mt-opp__coffee-text {
      flex: 1;
    }
    .mt-opp__coffee-title {
      font-size: var(--mt-text-xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-accent-700);
      margin: 0 0 var(--mt-space-2);
    }
    .mt-opp__coffee-desc {
      font-size: var(--mt-text-sm);
      color: var(--mt-neutral-600);
      line-height: var(--mt-leading-normal);
      margin: 0;
    }
    .mt-opp__coffee-btn {
      display: inline-flex;
      align-items: center;
      gap: var(--mt-space-2);
      flex-shrink: 0;
      padding: var(--mt-space-3) var(--mt-space-7);
      background: var(--mt-accent-500);
      color: #fff;
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-base);
      font-weight: var(--mt-font-bold);
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(245, 158, 11, 0.3);
      transition: background var(--mt-transition-fast), transform var(--mt-transition-fast);
    }
    .mt-opp__coffee-btn:hover {
      background: var(--mt-accent-600);
      transform: translateY(-2px);
    }
    .mt-opp__coffee-icon {
      font-size: var(--mt-text-xl);
    }

    /* Cards grid */
    .mt-opp__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: var(--mt-space-5);
      max-width: 1100px;
      margin: 0 auto;
    }
    .mt-opp__card {
      padding: var(--mt-space-6);
      display: flex;
      flex-direction: column;
    }
    .mt-opp__card-icon {
      font-size: var(--mt-text-3xl);
      margin-bottom: var(--mt-space-4);
    }
    .mt-opp__card-title {
      font-size: var(--mt-text-lg);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-heading);
      margin: 0 0 var(--mt-space-3);
    }
    .mt-opp__card-text {
      font-size: var(--mt-text-base);
      color: var(--mt-text);
      line-height: var(--mt-leading-relaxed);
      margin: 0 0 var(--mt-space-3);
    }
    .mt-opp__card-placeholder {
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
      line-height: var(--mt-leading-normal);
      font-style: italic;
      margin: 0 0 var(--mt-space-3);
      padding: var(--mt-space-3);
      background: var(--mt-neutral-50);
      border-radius: var(--mt-radius-sm);
      border-left: 3px solid var(--mt-accent-300);
    }
    .mt-opp__card-btn {
      align-self: flex-start;
      margin-top: auto;
      padding: var(--mt-space-2) var(--mt-space-5);
      background: var(--mt-primary);
      color: #fff;
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-semibold);
      text-decoration: none;
      transition: background var(--mt-transition-fast);
    }
    .mt-opp__card-btn:hover {
      background: var(--mt-primary-700);
    }

    /* Responsive */
    @media (max-width: 767.98px) {
      .mt-opp__coffee {
        flex-direction: column;
        text-align: center;
      }
      .mt-opp__grid {
        grid-template-columns: 1fr;
      }
    }
  `],
})
export class OpportunitiesPage implements OnInit, OnDestroy {
  private readonly seo = inject(SeoService);

  ngOnInit(): void {
    this.seo.setPage({
      title: 'Opportunities — Maaruri Tools',
      description:
        'Explore opportunities with Maaruri Tools — student resources, startup guidance, tool placement slots, and partnership options. Support us with a coffee.',
      url: typeof window !== 'undefined' ? window.location.href : '/opportunities',
      keywords:
        'opportunities, students, startup, tool placement, advertising, partnership, buy a coffee, support',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Opportunities — Maaruri Tools',
        description:
          'Explore opportunities with Maaruri Tools — student resources, startup guidance, tool placement slots, and partnership options.',
        url: typeof window !== 'undefined' ? window.location.href : '/opportunities',
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
