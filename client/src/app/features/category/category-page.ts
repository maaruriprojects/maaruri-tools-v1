import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToolRegistryService } from '../../core/config/tool-registry.service';

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
};

@Component({
  selector: 'app-category-page',
  imports: [CommonModule, RouterLink],
  template: `
    @if (category()) {
      <div class="mt-category">
        <div class="mt-container">
          <div class="mt-category__header">
            <span class="mt-category__icon">{{ getIcon(category()!.icon) }}</span>
            <div>
              <h1 class="mt-category__title">{{ category()!.name }}</h1>
              <p class="mt-category__desc">{{ category()!.description }}</p>
            </div>
          </div>

          @if (tools().length > 0) {
            <div class="mt-category__grid">
              @for (tool of tools(); track tool.id) {
                <a class="mt-category__card mt-card" [routerLink]="'/' + category()!.slug + '/' + tool.slug">
                  <span class="mt-category__card-icon">{{ getIcon(tool.icon) }}</span>
                  <div class="mt-category__card-body">
                    <h3 class="mt-category__card-title">{{ tool.name }}</h3>
                    <p class="mt-category__card-desc">{{ tool.shortDescription }}</p>
                  </div>
                </a>
              }
            </div>
          } @else {
            <div class="mt-category__empty">
              <div class="mt-category__empty-icon">{{ getIcon(category()!.icon) }}</div>
              <h2 class="mt-category__empty-title">Tools Coming Soon</h2>
              <p class="mt-category__empty-text">
                We're working on tools for {{ category()!.name }}. Check back soon!
              </p>
              <a class="mt-category__empty-link" routerLink="/">Browse other categories</a>
            </div>
          }
        </div>
      </div>
    } @else if (loaded()) {
      <div class="mt-category">
        <div class="mt-container">
          <div class="mt-category__empty">
            <div class="mt-category__empty-icon">🔍</div>
            <h2 class="mt-category__empty-title">Category Not Found</h2>
            <p class="mt-category__empty-text">This category doesn't exist.</p>
            <a class="mt-category__empty-link" routerLink="/">Back to home</a>
          </div>
        </div>
      </div>
    } @else {
      <div class="mt-category">
        <div class="mt-container">
          <p class="mt-text-muted">Loading...</p>
        </div>
      </div>
    }
  `,
  styles: [`
    .mt-category {
      padding: var(--mt-space-8) var(--mt-space-5) var(--mt-space-10);
    }
    .mt-category__header {
      display: flex;
      align-items: flex-start;
      gap: var(--mt-space-5);
      margin-bottom: var(--mt-space-8);
    }
    .mt-category__icon {
      font-size: 2.5rem;
      flex-shrink: 0;
      line-height: 1;
    }
    .mt-category__title {
      font-size: var(--mt-text-3xl);
      font-weight: var(--mt-font-bold);
      color: var(--mt-heading);
      margin: 0 0 var(--mt-space-2);
    }
    .mt-category__desc {
      font-size: var(--mt-text-base);
      color: var(--mt-text-muted);
      margin: 0;
    }
    .mt-category__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: var(--mt-space-5);
    }
    .mt-category__card {
      display: flex;
      align-items: flex-start;
      gap: var(--mt-space-4);
      padding: var(--mt-space-5);
      text-decoration: none;
      color: var(--mt-text);
    }
    .mt-category__card:hover {
      transform: translateY(-2px);
      box-shadow: var(--mt-shadow-md);
    }
    .mt-category__card-icon {
      font-size: var(--mt-text-2xl);
      flex-shrink: 0;
    }
    .mt-category__card-title {
      font-size: var(--mt-text-base);
      font-weight: var(--mt-font-semibold);
      margin: 0 0 var(--mt-space-2);
      color: var(--mt-heading);
    }
    .mt-category__card-desc {
      font-size: var(--mt-text-sm);
      color: var(--mt-text-muted);
      margin: 0;
      line-height: var(--mt-leading-normal);
    }
    .mt-category__empty {
      text-align: center;
      padding: var(--mt-space-10) var(--mt-space-5);
    }
    .mt-category__empty-icon {
      font-size: 3.5rem;
      margin-bottom: var(--mt-space-5);
      opacity: 0.6;
    }
    .mt-category__empty-title {
      font-size: var(--mt-text-2xl);
      font-weight: var(--mt-font-semibold);
      color: var(--mt-heading);
      margin: 0 0 var(--mt-space-3);
    }
    .mt-category__empty-text {
      font-size: var(--mt-text-base);
      color: var(--mt-text-muted);
      margin: 0 0 var(--mt-space-6);
    }
    .mt-category__empty-link {
      display: inline-block;
      padding: var(--mt-space-3) var(--mt-space-6);
      background: var(--mt-primary);
      color: #fff;
      border-radius: var(--mt-radius-md);
      font-size: var(--mt-text-sm);
      font-weight: var(--mt-font-semibold);
      text-decoration: none;
      transition: background var(--mt-transition-fast);
    }
    .mt-category__empty-link:hover {
      background: var(--mt-primary-700);
    }
  `],
})
export class CategoryPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly registry = inject(ToolRegistryService);

  private readonly _categorySlug = signal<string>('');
  readonly loaded = signal<boolean>(false);

  readonly category = computed(() => this.registry.getCategory(this._categorySlug()));
  readonly tools = computed(() => this.registry.getToolsForCategory(this._categorySlug()));

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this._categorySlug.set(params.get('categorySlug') ?? '');
    });
    this.registry.load().subscribe(() => this.loaded.set(true));
  }

  getIcon(name: string): string {
    return ICONS[name] ?? '🔧';
  }
}
