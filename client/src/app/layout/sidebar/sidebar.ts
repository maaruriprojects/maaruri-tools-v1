import { Component, inject, signal, computed, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
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
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit {
  private readonly registry = inject(ToolRegistryService);
  private readonly router = inject(Router);

  readonly categories = this.registry.categories;

  readonly expanded = signal<boolean>(false);
  readonly mobileOpen = signal<boolean>(false);
  readonly loadError = signal<boolean>(false);

  readonly toolCounts = computed(() => {
    const tools = this.registry.tools();
    const counts: Record<string, number> = {};
    for (const cat of this.categories()) {
      counts[cat.slug] = tools.filter((t) => t.categorySlug === cat.slug).length;
    }
    return counts;
  });

  ngOnInit(): void {
    this.registry.load().subscribe((result) => {
      if (result === null && this.categories().length === 0) {
        this.loadError.set(true);
      }
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
