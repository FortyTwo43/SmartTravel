import { Injectable, inject } from '@angular/core';
import { Destino } from '../../../domain/entities/Destino';
import { SupabaseDestinoRepository } from '../../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { GetImageUrlUseCase } from '../../upload/GetImageUrlUseCase';

export interface DetalleDestinoData extends Destino {
  readonly imagenUrl: string;
  readonly descripcionDisplay: string;
}

@Injectable({ providedIn: 'root' })
export class GetDetalleDestinoUseCase {
  private readonly destinoRepo = inject(SupabaseDestinoRepository);
  private readonly getImageUrlUseCase = inject(GetImageUrlUseCase);

  async execute(id: string): Promise<DetalleDestinoData | null> {
    const destino = await this.destinoRepo.getById(id);
    if (!destino) return null;

    const imagenUrl = destino.imagen
      ? await this.getImageUrlUseCase.execute(destino.imagen, 'destinos-imagenes')
      : '';

    const descripcionDisplay = this.buildDescripcionDisplay(destino);

    return {
      ...destino,
      imagenUrl,
      descripcionDisplay
    };
  }

  private buildDescripcionDisplay(destino: Destino): string {
    const descripcionReal = destino.descripcion?.trim();
    if (descripcionReal && descripcionReal.length > 0) {
      return descripcionReal;
    }

    const nombre = destino.nombre;
    const ciudad = destino.ciudad;
    const pais = destino.pais;
    const tipoExperiencia = destino.tipo_experiencia;

    return `Explora ${nombre}, ubicado en ${ciudad}, ${pais}. Ideal para viajeros interesados en ${tipoExperiencia}.`;
  }
}
