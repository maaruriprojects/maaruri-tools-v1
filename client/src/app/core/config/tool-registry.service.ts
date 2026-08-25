import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Category, Tool } from '../../shared/models';

export interface RegistryFile {
  categories: Category[];
  tools: Tool[];
}

/**
 * Loads tool-registry.json once and exposes the categories and tools
 * as signals. Any component that needs registry data injects this
 * service instead of fetching the file independently.
 */
@Injectable({ providedIn: 'root' })
export class ToolRegistryService {
  private readonly http = inject(HttpClient);

  private readonly _categories = signal<Category[]>([]);
  private readonly _tools = signal<Tool[]>([]);
  private loaded = false;

  readonly categories = this._categories.asReadonly();
  readonly tools = this._tools.asReadonly();

  load(): Observable<RegistryFile | null> {
    if (this.loaded) {
      return of(null);
    }
    return this.http.get<RegistryFile>('/assets/data/tool-registry.json').pipe(
      tap((data) => {
        this._categories.set(data.categories);
        this._tools.set(data.tools);
        this.loaded = true;
      }),
      catchError((err) => {
        console.error('Failed to load tool registry:', err);
        return of(null);
      }),
    );
  }

  getToolsForCategory(slug: string): Tool[] {
    return this._tools().filter((t) => t.categorySlug === slug);
  }

  getCategory(slug: string): Category | undefined {
    return this._categories().find((c) => c.slug === slug);
  }
}
