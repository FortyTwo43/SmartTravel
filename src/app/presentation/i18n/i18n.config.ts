import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

// In version 17+, TranslateHttpLoader uses inject() and an InjectionToken for config
export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

export const i18nConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory
  },
  defaultLanguage: 'es'
};

export const i18nProviders = [
  {
    provide: TRANSLATE_HTTP_LOADER_CONFIG,
    useValue: {
      prefix: './i18n/',
      suffix: '.json'
    }
  }
];
