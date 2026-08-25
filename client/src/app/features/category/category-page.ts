import { Component, inject, signal, computed, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  selector: 'app-category-page',
  imports: [CommonModule, FormsModule, RouterLink, AdBanner, AdAuto],
  templateUrl: './category-page.html',
  styleUrl: './category-page.scss',
})
export class CategoryPage implements OnInit, OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly registry = inject(ToolRegistryService);
  private readonly seo = inject(SeoService);

  private readonly _categorySlug = signal<string>('');
  readonly loaded = signal<boolean>(false);
  readonly searchQuery = signal<string>('');
  readonly sortBy = signal<'name' | 'relevance'>('name');

  readonly category = computed<Category | undefined>(() =>
    this.registry.getCategory(this._categorySlug()),
  );

  readonly allTools = computed<Tool[]>(() =>
    this.registry.getToolsForCategory(this._categorySlug()),
  );

  readonly tools = computed<Tool[]>(() => {
    const all = this.allTools();
    const q = this.searchQuery().trim().toLowerCase();
    let filtered = all;

    if (q.length > 0) {
      filtered = all.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.shortDescription.toLowerCase().includes(q) ||
          t.searchKeywords.some((kw) => kw.toLowerCase().includes(q)),
      );
    }

    if (this.sortBy() === 'name') {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  });

  readonly toolCount = computed(() => this.allTools().length);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this._categorySlug.set(params.get('categorySlug') ?? '');
      this.updateSeo();
    });
    this.registry.load().subscribe(() => {
      this.loaded.set(true);
      this.updateSeo();
    });
  }

  ngOnDestroy(): void {
    this.seo.setPage({
      title: 'Maaruri Tools — Free Online Utility Tools',
      url: typeof window !== 'undefined' ? window.location.href : '/',
    });
  }

  private updateSeo(): void {
    const cat = this.category();
    if (!cat) return;

    const url = typeof window !== 'undefined' ? window.location.href : `/${cat.slug}`;
    const title = `${cat.name} — Free Online Tools`;
    const description = `${cat.description} ${this.allTools().length} free tools available. No signup, no download — use them directly in your browser.`;

    this.seo.setPage({
      title,
      description,
      url,
      keywords: `${cat.name.toLowerCase()}, ${cat.slug.replace(/-/g, ', ')}, free online tools`,
      jsonLd: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: cat.name,
        description: cat.description,
        url,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: this.allTools().map((tool, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url:
              (typeof window !== 'undefined' ? window.location.origin : '') +
              `/${cat.slug}/${tool.slug}`,
            name: tool.name,
          })),
        },
      },
    });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
  }

  onSortChange(value: 'name' | 'relevance'): void {
    this.sortBy.set(value);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  getIcon(name: string): string {
    return ICONS[name] ?? '🔧';
  }
}
