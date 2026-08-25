import { Component, input, inject, AfterViewInit } from '@angular/core';
import { AdService } from '../../core/ads/ad.service';

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
  private readonly adService = inject(AdService);

  /** Google AdSense slot ID — replace with your real slot ID. */
  readonly slot = input<string>('0000000000');
  readonly clientId = this.adService.clientId;

  ngAfterViewInit(): void {
    this.adService.pushAd();
  }
}
