import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Category, Tool } from '../../shared/models';

interface RegistryFile {
  categories: Category[];
  tools: Tool[];
}

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
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private readonly _categories = signal<Category[]>([]);
  private readonly _tools = signal<Tool[]>([]);
  readonly categories = this._categories.asReadonly();

  readonly expanded = signal<boolean>(false);
  readonly mobileOpen = signal<boolean>(false);

  readonly toolCounts = computed(() => {
    const tools = this._tools();
    const counts: Record<string, number> = {};
    for (const cat of this._categories()) {
      counts[cat.slug] = tools.filter((t) => t.categorySlug === cat.slug).length;
    }
    return counts;
  });

  constructor() {
    this.http.get<RegistryFile>('assets/data/tool-registry.json').subscribe((data) => {
      this._categories.set(data.categories);
      this._tools.set(data.tools);
    });
  }

  onHoverEnter(): void {
    this.expanded.set(true);
  }

  onHoverLeave(): void {
    this.expanded.set(false);
  }

  toggle(): void {
    this.expanded.update((v) => !v);
  }

  toggleMobile(): void {
    this.mobileOpen.update((v) => !v);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  getIcon(iconName: string): string {
    return ICONS[iconName] ?? '🔧';
  }

  hasTools(slug: string): boolean {
    return (this.toolCounts()[slug] ?? 0) > 0;
  }

  getToolCount(slug: string): number {
    return this.toolCounts()[slug] ?? 0;
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.mobileOpen.set(false);
  }
}
