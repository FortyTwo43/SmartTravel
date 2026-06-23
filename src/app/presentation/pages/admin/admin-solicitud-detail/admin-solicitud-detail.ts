import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  LucideAngularModule,
  LucideIconProvider,
  LUCIDE_ICONS,
  XCircle
} from 'lucide-angular';
import { AdminSolicitudProveedorView, SolicitudProveedorEstado } from '../../../../domain/ui/admin/solicitudes/AdminSolicitudProveedorView';
import { GetAdminSolicitudDetailUseCase } from '../../../../useCase/admin/solicitudes/GetAdminSolicitudDetailUseCase';
import { UpdateSolicitudProveedorEstadoUseCase } from '../../../../useCase/admin/solicitudes/UpdateSolicitudProveedorEstadoUseCase';

@Component({
  selector: 'app-admin-solicitud-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ AlertCircle, ArrowLeft, CheckCircle2, Download, FileText, XCircle })
  }],
  templateUrl: './admin-solicitud-detail.html',
  styleUrl: './admin-solicitud-detail.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSolicitudDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly sanitizer = inject(DomSanitizer);
  private readonly getSolicitudDetail = inject(GetAdminSolicitudDetailUseCase);
  private readonly updateEstado = inject(UpdateSolicitudProveedorEstadoUseCase);

  readonly detail = signal<AdminSolicitudProveedorView | null>(null);
  readonly isLoading = signal(true);
  readonly isUpdating = signal(false);
  readonly error = signal<string | null>(null);

  readonly safeDocumentUrl = computed<SafeResourceUrl | null>(() => {
    const documentUrl = this.detail()?.documento.signedUrl;

    return documentUrl ? this.sanitizer.bypassSecurityTrustResourceUrl(documentUrl) : null;
  });

  ngOnInit(): void {
    this.loadSolicitud();
  }

  async loadSolicitud(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error.set('No se encontro la solicitud seleccionada.');
      this.isLoading.set(false);
      return;
    }

    this.isLoading.set(true);
    this.error.set(null);

    try {
      const detail = await this.getSolicitudDetail.execute(id);

      if (!detail) {
        this.error.set('La solicitud no existe o ya no esta disponible.');
        return;
      }

      this.detail.set(detail);
    } catch (error) {
      console.error('Error al cargar detalle de solicitud', error);
      this.error.set('No se pudo cargar el detalle de la solicitud.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async changeStatus(status: SolicitudProveedorEstado): Promise<void> {
    const detail = this.detail();

    if (!detail || this.isUpdating()) {
      return;
    }

    this.isUpdating.set(true);
    this.error.set(null);

    try {
      const updatedSolicitud = await this.updateEstado.execute(detail.solicitud.id, status);
      this.detail.set({
        ...detail,
        solicitud: updatedSolicitud
      });
    } catch (error) {
      console.error('Error al actualizar solicitud', error);
      this.error.set('No se pudo actualizar el estado de la solicitud.');
    } finally {
      this.isUpdating.set(false);
    }
  }
}
