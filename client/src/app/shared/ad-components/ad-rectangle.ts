import { Component, input, inject, AfterViewInit } from '@angular/core';
import { AdService } from '../../core/ads/ad.service';

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
  private readonly adService = inject(AdService);

  /** Google AdSense slot ID — replace with your real slot ID. */
  readonly slot = input<string>('0000000000');
  readonly clientId = this.adService.clientId;

  ngAfterViewInit(): void {
    this.adService.pushAd();
  }
}
