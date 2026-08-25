import { Component, input, AfterViewInit } from '@angular/core';

/**
 * <app-ad-banner> — Bottom banner ad.
 * Always visible, auto width, reserved min-height to prevent CLS.
 *
 * ── Replace these placeholders ──────────────────────────────
 * • data-ad-client: update in index.html + environment files
 * • data-ad-slot:   pass a real slot ID via the [slot] input
 *                   e.g. <app-ad-banner slot="1234567890" />
 */
@Component({
  selector: 'app-ad-banner',
  imports: [],
  templateUrl: './ad-banner.html',
  styleUrl: './ad-banner.scss',
})
export class AdBanner implements AfterViewInit {
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
