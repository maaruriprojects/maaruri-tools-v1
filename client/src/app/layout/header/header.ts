import { Component, inject, signal, computed, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../../core/config/search.service';
import { LocaleService } from '../../core/config/locale.service';
import { AppConfigService } from '../../core/config/app-config.service';
import { Category, Tool } from '../../shared/models';

interface NavItem {
  label: string;
  link: string;
  icon: 'home' | 'info' | 'envelope' | 'briefcase';
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  private readonly searchService = inject(SearchService);
  private readonly localeService = inject(LocaleService);
  private readonly config = inject(AppConfigService);
  private readonly router = inject(Router);

  readonly siteName = this.config.siteName;
  readonly logoUrl = signal<string>('');

  readonly locales = this.localeService.locales;
  readonly selectedCountry = this.localeService.selectedCountry;
  readonly selectedLanguage = this.localeService.selectedLanguage;
  readonly currencySymbol = this.localeService.currencySymbol;

  readonly navItems: NavItem[] = [
    { label: 'Home', link: '/', icon: 'home' },
    { label: 'About Us', link: '/about', icon: 'info' },
    { label: 'Contact Us', link: '/contact', icon: 'envelope' },
    { label: 'Opportunities', link: '/opportunities', icon: 'briefcase' },
  ];

  readonly toolsMenuCategories = signal<Category[]>([]);
  readonly recentTools = signal<Tool[]>([]);

  // Search state
  readonly searchQuery = signal<string>('');
  readonly searchResults = computed(() => this.searchService.search(this.searchQuery()));
  readonly searchFocused = signal<boolean>(false);

  // Dropdown state
  readonly toolsDropdownOpen = signal<boolean>(false);
  readonly countryPopupOpen = signal<boolean>(false);
  readonly mobileMenuOpen = signal<boolean>(false);

  // Country popup state
  readonly tempSelectedCountry = signal<string>('IN');
  readonly tempSelectedLanguage = signal<string>('en');

  readonly currentLanguages = computed(() =>
    this.localeService.getLanguagesForCountry(this.tempSelectedCountry()),
  );

  ngOnInit(): void {
    this.searchService.load().subscribe();
    this.localeService.load().subscribe(() => {
      this.tempSelectedCountry.set(this.selectedCountry());
      this.tempSelectedLanguage.set(this.selectedLanguage());
    });
  }

  onSearchInput(value: string): void {
    this.searchQuery.set(value);
  }

  onSearchFocus(): void {
    this.searchFocused.set(true);
  }

  onSearchBlur(): void {
    setTimeout(() => this.searchFocused.set(false), 200);
  }

  onSearchResultClick(url: string): void {
    this.searchQuery.set('');
    this.searchFocused.set(false);
    this.router.navigate([url]);
  }

  toggleToolsDropdown(): void {
    this.toolsDropdownOpen.update((v) => !v);
  }

  closeToolsDropdown(): void {
    this.toolsDropdownOpen.set(false);
  }

  toggleCountryPopup(): void {
    if (!this.countryPopupOpen()) {
      this.tempSelectedCountry.set(this.selectedCountry());
      this.tempSelectedLanguage.set(this.selectedLanguage());
    }
    this.countryPopupOpen.update((v) => !v);
  }

  closeCountryPopup(): void {
    this.countryPopupOpen.set(false);
  }

  onCountrySelect(code: string): void {
    this.tempSelectedCountry.set(code);
    const langs = this.localeService.getLanguagesForCountry(code);
    if (langs.length > 0 && !langs.includes(this.tempSelectedLanguage())) {
      this.tempSelectedLanguage.set(langs[0]);
    }
  }

  onLanguageSelect(lang: string): void {
    this.tempSelectedLanguage.set(lang);
  }

  applyCountrySelection(): void {
    this.localeService.selectCountry(this.tempSelectedCountry());
    this.localeService.selectLanguage(this.tempSelectedLanguage());
    this.countryPopupOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    this.toolsDropdownOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.mt-tools-nav') && !target.closest('.mt-tools-dropdown')) {
      this.toolsDropdownOpen.set(false);
    }
    if (!target.closest('.mt-country-selector') && !target.closest('.mt-country-popup')) {
      this.countryPopupOpen.set(false);
    }
  }

  getLanguageName(code: string): string {
    return this.localeService.getLanguageName(code);
  }

  getCurrentCountryFlag(): string {
    const locale = this.locales().find((l) => l.countryCode === this.selectedCountry());
    return locale?.flag ?? '🏳️';
  }

  getCurrentCountryFlagImage(): string | null {
    return this.localeService.getFlagImage(this.selectedCountry());
  }
}
