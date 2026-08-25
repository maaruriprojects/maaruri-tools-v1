import { Component, input, AfterViewInit } from '@angular/core';

/**
 * <app-ad-rectangle> — Right-side rectangle ad.
 * Desktop: right side of tool workspace.
 * Tablet:  shrinks gracefully.
 * Mobile:  hides from right side, moves below tool automatically.
 *
 * ── Replace these placeholders ──────────────────────────────
 * • data-ad-client: update in index.html + environment files
 * • data-ad-slot:   pass a real slot ID via the [slot] input
 */
@Component({
  selector: 'app-ad-rectangle',
  imports: [],
  templateUrl: './ad-rectangle.html',
  styleUrl: './ad-rectangle.scss',
})
export class AdRectangle implements AfterViewInit {
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
