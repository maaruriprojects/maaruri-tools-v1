import { Injectable, inject, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Locale } from '../../shared/models';

interface LocalesFile {
  locales: Locale[];
  languages: Record<string, { name: string; nativeName: string }>;
}

/**
 * Loads locales.json and tracks the user's selected country and
 * language. The active currency symbol is derived from the selected
 * country and exposed as a signal so any component can react to
 * country changes without hardcoded values.
 */
@Injectable({ providedIn: 'root' })
export class LocaleService {
  private readonly http = inject(HttpClient);

  private readonly _locales = signal<Locale[]>([]);
  private readonly _languageNames = signal<Record<string, { name: string; nativeName: string }>>({});
  private readonly _selectedCountry = signal<string>('IN');
  private readonly _selectedLanguage = signal<string>('en');

  readonly locales = this._locales.asReadonly();
  readonly selectedCountry = this._selectedCountry.asReadonly();
  readonly selectedLanguage = this._selectedLanguage.asReadonly();

  /** The full Locale object for the currently selected country. */
  readonly currentLocale = signal<Locale | null>(null);

  /** Active currency symbol — read this anywhere currency is displayed. */
  readonly currencySymbol = signal<string>('₹');
  readonly currencyCode = signal<string>('INR');

  load(): Observable<LocalesFile | null> {
    return this.http.get<LocalesFile>('/assets/data/locales.json').pipe(
      tap((data) => {
        this._locales.set(data.locales);
        this._languageNames.set(data.languages);
        this.applyDefaults();
      }),
      catchError((err) => {
        console.error('Failed to load locales:', err);
        return of(null);
      }),
    );
  }

  selectCountry(code: string): void {
    this._selectedCountry.set(code);
    const locale = this._locales().find((l) => l.countryCode === code);
    if (locale) {
      this.currentLocale.set(locale);
      this.currencySymbol.set(locale.currencySymbol);
      this.currencyCode.set(locale.currencyCode);
      if (!locale.languages.includes(this._selectedLanguage())) {
        this._selectedLanguage.set(locale.languages[0]);
      }
    }
  }

  selectLanguage(lang: string): void {
    this._selectedLanguage.set(lang);
  }

  getLanguageName(code: string): string {
    return this._languageNames()[code]?.nativeName ?? code;
  }

  getLanguagesForCountry(code: string): string[] {
    return this._locales().find((l) => l.countryCode === code)?.languages ?? [];
  }

  private applyDefaults(): void {
    const code = this._selectedCountry();
    const locale = this._locales().find((l) => l.countryCode === code);
    if (locale) {
      this.currentLocale.set(locale);
      this.currencySymbol.set(locale.currencySymbol);
      this.currencyCode.set(locale.currencyCode);
      if (!locale.languages.includes(this._selectedLanguage())) {
        this._selectedLanguage.set(locale.languages[0]);
      }
    }
  }
}
