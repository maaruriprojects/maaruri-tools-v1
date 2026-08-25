import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToolRegistryService } from '../../../core/config/tool-registry.service';
import { AdBanner } from '../../../shared/ad-components/ad-banner';
import { AdRectangle } from '../../../shared/ad-components/ad-rectangle';
import { AdInArticle } from '../../../shared/ad-components/ad-in-article';
import { AdAuto } from '../../../shared/ad-components/ad-auto';
import { Tool, ToolMeta, FaqItem, ToolExample } from '../../../shared/models';
import { DigitalClock } from '../time-date-tools/digital-clock';
import { AnalogClock } from '../time-date-tools/analog-clock';
import { AgeCalculator } from '../time-date-tools/age-calculator';
import { BmiCalculator } from '../health-fitness/bmi-calculator';
import { WaterIntakeCalculator } from '../health-fitness/water-intake-calculator';
import { AutoLoanCalculator } from '../finance-money-tools/auto-loan-calculator';
import { AutoMouseMover } from '../work-productivity/auto-mouse-mover';
import { HeightConversion } from '../converters-calculators/height-conversion';
import { WordCounter } from '../everyday-practical-tools/word-counter';

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

interface ContentBlock {
  type: 'howItWorks' | 'howToUse' | 'faq' | 'formula' | 'examples';
  title: string;
  icon: string;
}

@Component({
  selector: 'app-tool-shell',
  imports: [CommonModule, RouterLink, AdBanner, AdRectangle, AdInArticle, AdAuto,
    DigitalClock, AnalogClock, AgeCalculator, BmiCalculator,
    WaterIntakeCalculator, AutoLoanCalculator, AutoMouseMover,
    HeightConversion, WordCounter],
  templateUrl: './tool-shell.html',
  styleUrl: './tool-shell.scss',
})
export class ToolShell implements OnInit {
  private readonly route: ActivatedRoute = inject(ActivatedRoute);
  private readonly router: Router = inject(Router);
  private readonly registry: ToolRegistryService = inject(ToolRegistryService);
  private readonly http: HttpClient = inject(HttpClient);
  private readonly _categorySlug = signal<string>('');
  private readonly _toolSlug = signal<string>('');
  readonly loaded = signal<boolean>(false);

  readonly tool = computed<Tool | undefined>(() =>
    this.registry.tools().find(
      (t: Tool) => t.slug === this._toolSlug() && t.categorySlug === this._categorySlug(),
    ),
  );

  readonly category = computed(() =>
    this.registry.getCategory(this._categorySlug()),
  );

  readonly relatedTools = computed<Tool[]>(() =>
    this.registry
      .getToolsForCategory(this._categorySlug())
      .filter((t: Tool) => t.slug !== this._toolSlug())
      .slice(0, 4),
  );

  readonly meta = signal<ToolMeta | null>(null);

  readonly howItWorks = computed<string[]>(() => this.meta()?.howItWorks ?? []);
  readonly howToUse = computed<string[]>(() => this.meta()?.howToUse ?? []);
  readonly faq = computed<FaqItem[]>(() => this.meta()?.faq ?? []);
  readonly examples = computed<ToolExample[]>(() => this.meta()?.examples ?? []);
  readonly formula = computed<string | null>(() => this.meta()?.formula ?? null);

  readonly contentBlocks = computed<ContentBlock[]>(() => {
    const m = this.meta();
    if (!m) return [];
    const blocks: ContentBlock[] = [];
    if (m.howItWorks.length > 0) blocks.push({ type: 'howItWorks', title: 'How It Works', icon: '⚙️' });
    if (m.howToUse.length > 0) blocks.push({ type: 'howToUse', title: 'How to Use', icon: '📋' });
    if (m.formula) blocks.push({ type: 'formula', title: 'Formula Used', icon: '🧮' });
    if (m.examples.length > 0) blocks.push({ type: 'examples', title: 'Examples', icon: '💡' });
    if (m.faq.length > 0) blocks.push({ type: 'faq', title: 'Frequently Asked Questions', icon: '❓' });
    return blocks;
  });

  readonly toolSlug = this._toolSlug.asReadonly();
  readonly isFullWidth = computed(() => this.tool()?.isFullWidth ?? false);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this._categorySlug.set(params.get('categorySlug') ?? '');
      this._toolSlug.set(params.get('toolSlug') ?? '');
      this.loadContent();
    });
    this.registry.load().subscribe(() => {
      this.loaded.set(true);
      this.loadContent();
    });
  }

  private loadContent(): void {
    const tool = this.tool();
    if (!tool) return;
    const path = tool.contentFile.replace(/^assets\//, '/assets/');
    this.http.get<ToolMeta>(path).subscribe({
      next: (data) => this.meta.set(data),
      error: (err) => console.error('Failed to load tool content:', err),
    });
  }

  getIcon(name: string): string {
    return ICONS[name] ?? '🔧';
  }

  getBlockData(block: ContentBlock): unknown {
    switch (block.type) {
      case 'howItWorks': return this.howItWorks();
      case 'howToUse': return this.howToUse();
      case 'faq': return this.faq();
      case 'examples': return this.examples();
      case 'formula': return this.formula();
      default: return null;
    }
  }
}
