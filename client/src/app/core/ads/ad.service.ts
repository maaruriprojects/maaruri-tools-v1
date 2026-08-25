import { Injectable, inject, signal, effect } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AppConfigService } from '../config/app-config.service';

/**
 * Manages Google AdSense initialization and ad-slot pushing.
 * The AdSense library script is loaded globally in index.html; this
 * service handles the per-slot `(adsbygoogle = window.adsbygoogle || []).push({})`
 * call and exposes the publisher ID so ad components can bind it.
 *
 * ── Configuration ──────────────────────────────────────────
 * Replace adsClientId in src/environments/environment.ts
 * (and environment.production.ts) with your real publisher ID,
 * e.g. ca-pub-1234567890123456. Also update the data-ad-client
 * placeholder in index.html to match.
 *
 * ── Per-slot IDs ───────────────────────────────────────────
 * Each ad component accepts a `slot` input — replace the default
 * data-ad-slot value with the slot ID from your AdSense dashboard.
 */
@Injectable({ providedIn: 'root' })
export class AdService {
  private readonly config = inject(AppConfigService);
  private readonly document = inject(DOCUMENT);

  readonly clientId = signal<string>(this.config.adsClientId);
  readonly adsReady = signal<boolean>(false);

  constructor() {
    effect(() => {
      const id = this.clientId();
      if (id && !id.includes('XXXX')) {
        this.adsReady.set(true);
      }
    });
  }

  /**
   * Pushes an ad slot to the AdSense queue. Called by each ad
   * component after its view initializes. Safe to call before
   * the library script has loaded — AdSense processes the queue
   * once the script is ready.
   */
  pushAd(): void {
    try {
      const w = this.document.defaultView as unknown as {
        adsbygoogle?: unknown[];
      };
      if (!w.adsbygoogle) {
        w.adsbygoogle = [];
      }
      (w.adsbygoogle as unknown[]).push({});
    } catch (e) {
      console.warn('AdSense push failed:', e);
    }
  }
}
