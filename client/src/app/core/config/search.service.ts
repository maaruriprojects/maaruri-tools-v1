import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SearchEntry } from '../../shared/models';

interface SearchIndexFile {
  entries: SearchEntry[];
}

/**
 * Loads search-index.json once and provides offline, client-side
 * search across tools and categories. Suggestions appear from the
 * first typed character — no API calls.
 */
@Injectable({ providedIn: 'root' })
export class SearchService {
  private readonly http = inject(HttpClient);

  private readonly _entries = signal<SearchEntry[]>([]);
  readonly entries = this._entries.asReadonly();

  load(): Observable<SearchIndexFile> {
    return this.http.get<SearchIndexFile>('assets/data/search-index.json').pipe(
      tap((data) => this._entries.set(data.entries)),
    );
  }

  /**
   * Returns entries whose label or keywords contain the query
   * (case-insensitive). Matches from the first character typed.
   */
  search(query: string): SearchEntry[] {
    const q = query.trim().toLowerCase();
    if (q.length < 1) return [];

    return this._entries().filter((entry) => {
      if (entry.label.toLowerCase().includes(q)) return true;
      return entry.keywords.some((kw) => kw.toLowerCase().includes(q));
    });
  }
}
