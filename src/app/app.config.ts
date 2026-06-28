import { ApplicationConfig, InjectionToken, importProvidersFrom, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { provideEchartsCore } from 'ngx-echarts';

import { routes } from './app.routes';
import { i18nConfig, i18nProviders } from './presentation/i18n/i18n.config';
import { LanguageService } from './presentation/service/language/language.service';

export const RECOMMENDATIONS_API_URL = new InjectionToken<string>('RECOMMENDATIONS_API_URL');

export const createAppConfig = (supabase: SupabaseClient, recommendationsApiUrl: string): ApplicationConfig => ({
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(
      TranslateModule.forRoot(i18nConfig)
    ),
    provideAppInitializer(() => {
      const languageService = inject(LanguageService);
      return languageService.init();
    }),
    ...i18nProviders,
    { provide: SupabaseClient, useValue: supabase },
    { provide: RECOMMENDATIONS_API_URL, useValue: recommendationsApiUrl },
    provideEchartsCore({ echarts: () => import('echarts') })
  ]
});
