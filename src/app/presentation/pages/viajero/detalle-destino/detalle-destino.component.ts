import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, ArrowLeft, MapPin, Tag, CalendarPlus, BookOpen, Bookmark } from 'lucide-angular';

import { GetDetalleDestinoUseCase, DetalleDestinoData } from '../../../../useCase/viajero/detalle-destino/GetDetalleDestinoUseCase';

@Component({
  selector: 'app-detalle-destino',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule
  ],
  providers: [
    {
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({ ArrowLeft, MapPin, Tag, CalendarPlus, BookOpen, Bookmark })
    }
  ],
  templateUrl: './detalle-destino.component.html',
  styleUrl: './detalle-destino.component.css'
})
export class DetalleDestinoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly useCase = inject(GetDetalleDestinoUseCase);

  destino = signal<DetalleDestinoData | null>(null);
  isLoading = signal(true);
  error = signal<string | null>(null);

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error.set('ID de destino no encontrado.');
      this.isLoading.set(false);
      return;
    }
    await this.loadDestino(id);
  }

  private async loadDestino(id: string): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);
    try {
      const data = await this.useCase.execute(id);
      if (!data) {
        this.error.set('not_found');
      } else {
        this.destino.set(data);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error desconocido';
      console.error('[DetalleDestino]', message);
      this.error.set(message);
    } finally {
      this.isLoading.set(false);
    }
  }

  goBack(): void {
    this.router.navigate(['/traveler/explorar-destinos']);
  }
}
