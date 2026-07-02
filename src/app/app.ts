import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AVAILABLE_LANGUAGE_CODES, DEFAULT_LANGUAGE, LanguageCode } from './presentation/constants/languages.constant';
import { ThemeService } from './presentation/service/theme/theme.service';
import { FontSizeService } from './presentation/service/font-size/font-size.service';
import { TextSpacingService } from './presentation/service/text-spacing/text-spacing.service';
import { SessionService } from './presentation/service/session/session.service';
import { SessionWarningModalComponent } from './presentation/components/ui/session-warning-modal/session-warning-modal';

/** WCAG 2.4.2 — Mapa de rutas a títulos legibles */
const ROUTE_TITLES: Record<string, string> = {
  'home':                        'Inicio',
  'login':                       'Iniciar sesión',
  'register':                    'Crear cuenta',
  'traveler-onboarding':         'Preferencias de viaje',
  'live':                        'Streams en vivo',
  'traveler/dashboard':          'Mi dashboard — Viajero',
  'traveler/explorar-destinos':  'Explorar destinos',
  'traveler/accessibility':      'Configuración de accesibilidad',
  'provider/dashboard':          'Mi dashboard — Proveedor',
  'provider/services':           'Mis servicios',
  'provider/reservations':       'Reservas',
  'provider/statistics':         'Estadísticas',
  'provider/establecimiento':    'Mi establecimiento',
  'provider/accessibility':      'Configuración de accesibilidad',
  'admin/dashboard':             'Panel de administración',
  'admin/destinos':              'Gestión de destinos',
  'admin/solicitudes':           'Solicitudes de proveedores',
  'admin/estadisticas':          'Estadísticas — Admin',
  'admin/accessibility':         'Configuración de accesibilidad',
};

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet, 
    TranslateModule,
    SessionWarningModalComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('SmartTravel');
  private readonly translate = inject(TranslateService);
  protected readonly themeService = inject(ThemeService);
  protected readonly fontSizeService = inject(FontSizeService);
  private readonly router = inject(Router);
  private readonly titleService = inject(Title);
  private readonly sessionService = inject(SessionService);

  currentUrl = '';
  protected readonly textSpacingService = inject(TextSpacingService);

  constructor() {
    this.translate.addLangs(AVAILABLE_LANGUAGE_CODES);
    this.translate.setFallbackLang(DEFAULT_LANGUAGE);
    
    // WCAG 2.4.2 — Actualizar el <title> del documento en cada navegación
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const url = event.urlAfterRedirects.split('#')[0].replace(/^\//, '');
        this.currentUrl = '/' + url;

        // Buscar título exacto, luego por prefijo de ruta con ID dinámico
        const pageLabel =
          ROUTE_TITLES[url] ??
          ROUTE_TITLES[url.replace(/\/[^/]+$/, '')] ??
          'SmartTravel';

        const pageTitle = pageLabel === 'SmartTravel'
          ? 'SmartTravel'
          : `${pageLabel} — SmartTravel`;

        this.titleService.setTitle(pageTitle);
        this.title.set(pageTitle);
      });
  }

  changeLanguage(lang: LanguageCode) {
    this.translate.use(lang);
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }

  onSkipLinkClick(event: Event) {
    event.preventDefault();
    const main = document.getElementById('main-content');
    if (main) {
      main.setAttribute('tabindex', '-1');
      main.focus();
    }
  }
}
