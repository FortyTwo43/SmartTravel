import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { provideEchartsCore } from 'ngx-echarts';

import { routes } from './app.routes';
import { i18nConfig, i18nProviders } from './presentation/i18n/i18n.config';
import { LanguageService } from './presentation/service/language/language.service';

export function initializeLanguage(languageService: LanguageService) {
  return () => languageService.init();
}

export const createAppConfig = (supabase: SupabaseClient): ApplicationConfig => ({
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot(i18nConfig)
    ),
    { provide: APP_INITIALIZER, useFactory: initializeLanguage, deps: [LanguageService], multi: true },
    ...i18nProviders,
    { provide: SupabaseClient, useValue: supabase },
    provideEchartsCore({ echarts: () => import('echarts') })
  ]
});
