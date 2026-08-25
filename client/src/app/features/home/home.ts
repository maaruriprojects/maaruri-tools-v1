import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppConfigService } from '../../core/config/app-config.service';
import { ToolRegistryService } from '../../core/config/tool-registry.service';
import { SeoService } from '../../core/seo/seo.service';
import { AdBanner } from '../../shared/ad-components/ad-banner';
import { AdAuto } from '../../shared/ad-components/ad-auto';
import { Category, Tool } from '../../shared/models';

const ICONS: Record<string, string> = {
  'clock': '🕐',
  'heart-pulse': '❤️',
  'wallet': '💰',
  'briefcase': '💼',
  'calculator': '🧮',
  'house': '🏠',
  'palette': '🎨',
  'code': '💻',
  'plane': '✈️',
  'file-text': '📄',
  'users': '👥',
  'calendar-days': '📅',
  'droplet': '💧',
  'car': '🚗',
  'mouse-pointer': '🖱️',
  'ruler': '📏',
  'type': '🔤',
};

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink, AdBanner, AdAuto],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, OnDestroy {
  private readonly config = inject(AppConfigService);
  private readonly registry = inject(ToolRegistryService);
  private readonly seo = inject(SeoService);

  readonly siteName = this.config.siteName;
  readonly loaded = signal<boolean>(false);

  readonly categories = this.registry.categories;
  readonly tools = this.registry.tools;

  readonly toolCounts = computed<Record<string, number>>(() => {
    const counts: Record<string, number> = {};
    for (const cat of this.categories()) {
      counts[cat.slug] = 0;
    }
    for (const tool of this.tools()) {
      counts[tool.categorySlug] = (counts[tool.categorySlug] ?? 0) + 1;
    }
    return counts;
  });

  readonly featuredTools = computed<Tool[]>(() => this.tools().slice(0, 8));

  readonly stats = computed(() => {
    const totalTools = this.tools().length;
    const totalCategories = this.categories().length;
    return { totalTools, totalCategories };
  });

  ngOnInit(): void {
    this.registry.load().subscribe(() => this.loaded.set(true));

    this.seo.setPage({
      title: 'Maaruri Tools — Free Online Utility Tools',
      description:
        'Free online utility tools — calculators, converters, timers, clocks, and more. ' +
        'Fast, private, and works directly in your browser. No signup, no download.',
      url: typeof window !== 'undefined' ? window.location.href : '/',
      keywords:
        'free online tools, utility tools, calculators, converters, timers, clocks, ' +
        'BMI calculator, age calculator, word counter, height conversion, auto loan calculator',
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Maaruri Tools',
        url: typeof window !== 'undefined' ? window.location.origin : '/',
        description:
          'Free online utility tools — calculators, converters, timers, clocks, and more.',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate:
              (typeof window !== 'undefined' ? window.location.origin : '/') +
              '/?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.seo.setPage({
      title: 'Maaruri Tools — Free Online Utility Tools',
      url: typeof window !== 'undefined' ? window.location.href : '/',
    });
  }

  getIcon(name: string): string {
    return ICONS[name] ?? '🔧';
  }

  getToolCount(slug: string): number {
    return this.toolCounts()[slug] ?? 0;
  }
}
