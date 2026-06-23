import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  Inbox,
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
  XCircle
} from 'lucide-angular';
import {
  AdminSolicitudesData,
  GetAdminSolicitudesUseCase
} from '../../../../useCase/admin/solicitudes/GetAdminSolicitudesUseCase';
import { SolicitudProveedorEstado } from '../../../../domain/ui/admin/solicitudes/AdminSolicitudProveedorView';

interface EstadoOption {
  value: SolicitudProveedorEstado;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-admin-solicitudes',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ AlertCircle, CheckCircle2, Clock, FileText, Inbox, XCircle })
  }],
  templateUrl: './admin-solicitudes.html',
  styleUrl: './admin-solicitudes.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSolicitudesComponent implements OnInit {
  private readonly getSolicitudes = inject(GetAdminSolicitudesUseCase);

  readonly statusOptions: EstadoOption[] = [
    { value: 'pendiente', label: 'Pendientes', icon: 'Clock' },
    { value: 'aceptado', label: 'Aceptadas', icon: 'CheckCircle2' },
    { value: 'rechazado', label: 'Rechazadas', icon: 'XCircle' }
  ];

  readonly selectedStatus = signal<SolicitudProveedorEstado>('pendiente');
  readonly data = signal<AdminSolicitudesData | null>(null);
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  readonly solicitudes = computed(() => {
    const data = this.data();

    if (!data) {
      return [];
    }

    return data.solicitudes.filter((solicitud) => solicitud.estado === this.selectedStatus());
  });

  ngOnInit(): void {
    this.loadSolicitudes();
  }

  async loadSolicitudes(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      this.data.set(await this.getSolicitudes.execute());
    } catch (error) {
      console.error('Error al cargar solicitudes de proveedor', error);
      this.error.set('No se pudieron cargar las solicitudes de proveedores.');
    } finally {
      this.isLoading.set(false);
    }
  }

  selectStatus(status: SolicitudProveedorEstado): void {
    this.selectedStatus.set(status);
  }

  getTotal(status: SolicitudProveedorEstado): number {
    return this.data()?.totals[status] ?? 0;
  }
}
