import { Component, OnInit, OnDestroy, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { GetExplorarDestinosUseCase, ExploreDestination, ExploreFilter } from '../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { GetImageUrlUseCase } from '../../../../useCase/upload/GetImageUrlUseCase';
import { SearchService } from '../../../../core/services/search.service';
import { AnimationsService } from '../../../service/animations/animations.service';

import { TravelerFilterSidebarComponent } from '../../../components/viajero/explorar-destinos/traveler-filter-sidebar/traveler-filter-sidebar.component';
import { DestinationGridComponent } from '../../../components/viajero/explorar-destinos/destination-grid/destination-grid.component';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, SlidersHorizontal, RefreshCw, Smartphone } from 'lucide-angular';

@Component({
  selector: 'app-explorar-destinos',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    TravelerFilterSidebarComponent,
    DestinationGridComponent,
    LucideAngularModule
  ],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ SlidersHorizontal, RefreshCw, Smartphone })
  }],
  templateUrl: './explorar-destinos.component.html',
  styleUrl: './explorar-destinos.component.css'
})
export class ExplorarDestinosComponent implements OnInit, OnDestroy {
  private readonly useCase = inject(GetExplorarDestinosUseCase);
  private readonly getImageUrlUseCase = inject(GetImageUrlUseCase);
  protected readonly searchService = inject(SearchService);
  private readonly route = inject(ActivatedRoute);
  protected readonly animationsService = inject(AnimationsService);

  destinos = signal<ReadonlyArray<ExploreDestination>>([]);
  
  // Shake detection and permission state
  private isListening = false;
  private lastShakeTime = 0;
  isIOS = typeof window !== 'undefined' && 
          typeof (DeviceMotionEvent as any).requestPermission === 'function';
  isMotionSupported = typeof window !== 'undefined' && 'DeviceMotionEvent' in window;
  motionPermissionStatus = signal<'default' | 'granted' | 'denied' | 'not-supported'>('default');
  refreshStatusMessage = signal<string | null>(null);

  private readonly deviceMotionListener = (event: DeviceMotionEvent) => this.onDeviceMotion(event);
  
  filteredDestinations = computed(() => {
    const term = this.searchService.searchTerm();
    const all = this.destinos();
    if (!term) return all;
    return all.filter(d =>
      d.nombre.toLowerCase().includes(term) ||
      d.ciudad?.toLowerCase().includes(term) ||
      d.pais?.toLowerCase().includes(term) ||
      d.descripcion?.toLowerCase().includes(term)
    );
  });

  isLoading = signal(false);
  error = signal<string | null>(null);

  // Control del Bottom Sheet en móvil
  isMobileFiltersOpen = signal(false);

  // Referencia al sidebar para leer activeFiltersCount
  // (se usa un contador local paralelo para el badge del botón)
  _activePaises = signal<string[]>([]);
  _activeIntereses = signal<string[]>([]);
  _activeRating = signal<string | null>(null);
  _activeExperiencia = signal<string | null>(null);

  activeFiltersCount = computed(() => {
    let count = 0;
    if (this._activePaises().length) count++;
    if (this._activeIntereses().length) count++;
    if (this._activeRating()) count++;
    if (this._activeExperiencia()) count++;
    return count;
  });

  filtroCategorias = signal<string[]>([]);

  async ngOnInit(): Promise<void> {
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (q) {
        this.searchService.setTerm(q);
      }
    });
    await this.loadDestinos();
    this.initMotionDetection();
  }

  ngOnDestroy(): void {
    this.stopListening();
  }

  openMobileFilters() {
    this.isMobileFiltersOpen.set(true);
  }

  closeMobileFilters() {
    this.isMobileFiltersOpen.set(false);
  }

  async loadDestinos(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const data = await this.useCase.execute();
      const destinosWithImages = await Promise.all(
        data.map(async (destino) => ({
          ...destino,
          imagen: await this.getImageUrlUseCase.execute(destino.imagen, 'destinos-imagenes')
        }))
      );
      this.destinos.set(destinosWithImages);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error al cargar destinos';
      this.error.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }

  onApplyFilters(filters: ExploreFilter): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.useCase.execute(filters)
      .then(async res => {
        const destinosWithImages = await Promise.all(
          res.map(async (destino) => ({
            ...destino,
            imagen: await this.getImageUrlUseCase.execute(destino.imagen, 'destinos-imagenes')
          }))
        );
        this.destinos.set(destinosWithImages);
        if (destinosWithImages.length === 0) {
          this.error.set('No se encontraron destinos con esos filtros.');
        }
      })
      .catch(err => {
        const message = err instanceof Error ? err.message : 'Error al aplicar filtros';
        this.error.set(message);
      })
      .finally(() => this.isLoading.set(false));
  }

  // Motion Detection Methods (WCAG 2.5.4)
  async refreshDestinos(): Promise<void> {
    await this.loadDestinos();
    this.announceStatus('TRAVELER_EXPLORAR.REFRESH_SUCCESS');
  }

  initMotionDetection() {
    if (typeof window === 'undefined') return;

    if (!this.isMotionSupported) {
      this.motionPermissionStatus.set('not-supported');
      return;
    }

    if (this.animationsService.shakeToRefresh()) {
      if (this.isIOS) {
        const cached = localStorage.getItem('smarttravel_motion_permission');
        if (cached === 'granted') {
          this.motionPermissionStatus.set('granted');
          this.startListening();
        } else {
          this.motionPermissionStatus.set('default');
        }
      } else {
        this.motionPermissionStatus.set('granted');
        this.startListening();
      }
    } else {
      this.stopListening();
    }
  }

  startListening() {
    if (this.isListening || !this.isMotionSupported) return;
    window.addEventListener('devicemotion', this.deviceMotionListener);
    this.isListening = true;
    this.announceStatus('TRAVELER_EXPLORAR.SHAKE_GESTURE_ACTIVATED');
  }

  stopListening() {
    if (!this.isListening) return;
    window.removeEventListener('devicemotion', this.deviceMotionListener);
    this.isListening = false;
  }

  onDeviceMotion(event: DeviceMotionEvent) {
    const acceleration = event.accelerationIncludingGravity || event.acceleration;
    if (!acceleration) return;

    const x = acceleration.x;
    const y = acceleration.y;
    const z = acceleration.z;
    if (x === null || y === null || z === null) return;

    const force = Math.sqrt(x * x + y * y + z * z);
    const threshold = 15; // standard shake threshold in m/s2

    if (force > threshold) {
      const now = Date.now();
      if (now - this.lastShakeTime > 3000) { // 3-second cooldown
        this.lastShakeTime = now;
        this.refreshDestinos();
      }
    }
  }

  async requestMotionPermission() {
    if (typeof window === 'undefined') return;
    
    const requestPermission = (DeviceMotionEvent as any).requestPermission;
    if (typeof requestPermission === 'function') {
      try {
        const response = await requestPermission();
        if (response === 'granted') {
          this.motionPermissionStatus.set('granted');
          localStorage.setItem('smarttravel_motion_permission', 'granted');
          this.startListening();
          this.announceStatus('TRAVELER_EXPLORAR.SENSOR_PERMISSION_GRANTED');
        } else {
          this.motionPermissionStatus.set('denied');
          localStorage.setItem('smarttravel_motion_permission', 'denied');
          this.announceStatus('TRAVELER_EXPLORAR.SENSOR_PERMISSION_DENIED');
        }
      } catch (err) {
        console.error('Error requesting motion permission:', err);
        this.motionPermissionStatus.set('denied');
        this.announceStatus('TRAVELER_EXPLORAR.SENSOR_PERMISSION_DENIED');
      }
    }
  }

  announceStatus(messageKey: string) {
    this.refreshStatusMessage.set(messageKey);
    setTimeout(() => {
      if (this.refreshStatusMessage() === messageKey) {
        this.refreshStatusMessage.set(null);
      }
    }, 5000);
  }
}
