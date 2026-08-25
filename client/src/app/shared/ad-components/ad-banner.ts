import { Component, input, inject, AfterViewInit } from '@angular/core';
import { AdService } from '../../core/ads/ad.service';

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
  private readonly adService = inject(AdService);

  /** Google AdSense slot ID — replace with your real slot ID. */
  readonly slot = input<string>('0000000000');
  readonly clientId = this.adService.clientId;

  ngAfterViewInit(): void {
    this.adService.pushAd();
  }
}
