import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

/**
 * Sets per-page SEO metadata: title, description, canonical URL,
 * Open Graph tags, and JSON-LD structured data. Called by each
 * routed page on init to keep search and social previews accurate.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly titleService = inject(Title);

  private readonly defaultDescription = 'Free online utility tools — calculators, converters, timers and more. Fast, private, and works in your browser.';

  setTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  setDescription(description: string): void {
    this.meta.updateTag({ name: 'description', content: description });
  }

  setCanonicalUrl(url: string): void {
    let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }

  setKeywords(keywords: string): void {
    this.meta.updateTag({ name: 'keywords', content: keywords });
  }

  setOpenGraphTags(opts: { title: string; description: string; url: string; type?: string }): void {
    this.meta.updateTag({ property: 'og:title', content: opts.title });
    this.meta.updateTag({ property: 'og:description', content: opts.description });
    this.meta.updateTag({ property: 'og:url', content: opts.url });
    this.meta.updateTag({ property: 'og:type', content: opts.type ?? 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Maaruri Tools' });
  }

  setTwitterCardTags(opts: { title: string; description: string; url: string }): void {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: opts.title });
    this.meta.updateTag({ name: 'twitter:description', content: opts.description });
    this.meta.updateTag({ name: 'twitter:url', content: opts.url });
  }

  /**
   * Injects a JSON-LD structured data script block. Replaces any
   * existing JSON-LD block with the same @type.
   */
  setJsonLd(data: Record<string, unknown>): void {
    const type = String(data['@type'] ?? 'Thing');
    const existing = document.querySelector(`script[type="application/ld+json"][data-mt-type="${type}"]`);
    if (existing) {
      existing.remove();
    }
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-mt-type', type);
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  /**
   * Convenience method to set all common page metadata in one call.
   */
  setPage(opts: { title: string; description?: string; url: string; keywords?: string; jsonLd?: Record<string, unknown> }): void {
    const fullTitle = opts.title.includes('Maaruri Tools') ? opts.title : `${opts.title} | Maaruri Tools`;
    const description = opts.description ?? this.defaultDescription;

    this.setTitle(fullTitle);
    this.setDescription(description);
    this.setCanonicalUrl(opts.url);
    if (opts.keywords) {
      this.setKeywords(opts.keywords);
    }
    this.setOpenGraphTags({ title: fullTitle, description, url: opts.url });
    this.setTwitterCardTags({ title: fullTitle, description, url: opts.url });
    if (opts.jsonLd) {
      this.setJsonLd(opts.jsonLd);
    }
  }
}
