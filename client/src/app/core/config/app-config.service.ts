import { environment } from '../../../environments/environment';

/**
 * Provides typed access to app-wide configuration loaded from the
 * Angular environment files. Imported once at the root; features
 * inject this service instead of importing environment directly.
 */
import { Injectable } from '@angular/core';

export interface AppConfig {
  siteName: string;
  baseUrl: string;
  adsClientId: string;
  defaultLocale: string;
  production: boolean;
}

@Injectable({ providedIn: 'root' })
export class AppConfigService {
  private readonly config: AppConfig = {
    siteName: environment.siteName,
    baseUrl: environment.baseUrl,
    adsClientId: environment.adsClientId,
    defaultLocale: environment.defaultLocale,
    production: environment.production,
  };

  get(): AppConfig {
    return this.config;
  }

  get siteName(): string {
    return this.config.siteName;
  }

  get baseUrl(): string {
    return this.config.baseUrl;
  }

  get adsClientId(): string {
    return this.config.adsClientId;
  }

  get defaultLocale(): string {
    return this.config.defaultLocale;
  }

  get isProduction(): boolean {
    return this.config.production;
  }
}
