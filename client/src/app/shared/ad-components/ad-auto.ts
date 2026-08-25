import { Component, input, inject, AfterViewInit } from '@angular/core';
import { AdService } from '../../core/ads/ad.service';

/**
 * <app-ad-auto> — Hero section auto-format ad.
 * Supports auto-format advertisements.
 *
 * ── Replace these placeholders ──────────────────────────────
 * • data-ad-client: update in index.html + environment files
 * • data-ad-slot:   pass a real slot ID via the [slot] input
 */
@Component({
  selector: 'app-ad-auto',
  imports: [],
  templateUrl: './ad-auto.html',
  styleUrl: './ad-auto.scss',
})
export class AdAuto implements AfterViewInit {
  private readonly adService = inject(AdService);

  /** Google AdSense slot ID — replace with your real slot ID. */
  readonly slot = input<string>('0000000000');
  readonly clientId = this.adService.clientId;

  ngAfterViewInit(): void {
    this.adService.pushAd();
  }
}
