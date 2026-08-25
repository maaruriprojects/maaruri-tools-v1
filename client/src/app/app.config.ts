import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { loadingInterceptor } from './core/loading/loading.interceptor';
import { httpErrorInterceptor } from './core/error-handling/http-error.interceptor';
import { GlobalErrorHandler } from './core/error-handling/global-error-handler';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      }),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([loadingInterceptor, httpErrorInterceptor]),
    ),
    { provide: GlobalErrorHandler, useExisting: GlobalErrorHandler },
  ],
};
