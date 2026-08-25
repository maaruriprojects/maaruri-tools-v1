import { Component, input, AfterViewInit } from '@angular/core';

/**
 * <app-ad-in-article> — In-article ad.
 * Auto-sizes to available space. Insert after every two content
 * sections.
 *
 * ── Replace these placeholders ──────────────────────────────
 * • data-ad-client: update in index.html + environment files
 * • data-ad-slot:   pass a real slot ID via the [slot] input
 */
@Component({
  selector: 'app-ad-in-article',
  imports: [],
  templateUrl: './ad-in-article.html',
  styleUrl: './ad-in-article.scss',
})
export class AdInArticle implements AfterViewInit {
  /** Google AdSense slot ID — replace with your real slot ID. */
  readonly slot = input<string>('0000000000');
  /** Publisher ID — defaults to placeholder, override with real ID. */
  readonly clientId = input<string>('ca-pub-XXXXXXXXXXXXXXXX');

  ngAfterViewInit(): void {
    try {
      const w = window as unknown as { adsbygoogle?: unknown[] };
      if (!w.adsbygoogle) w.adsbygoogle = [];
      (w.adsbygoogle as unknown[]).push({});
    } catch (e) {
      console.warn('AdSense push failed:', e);
    }
  }
}
