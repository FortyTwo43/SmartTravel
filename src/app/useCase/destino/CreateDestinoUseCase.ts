import { Injectable } from '@angular/core';
import { SupabaseDestinoRepository } from '../../infrastructure/repositories/supabase/SupabaseDestinoRepository';
import { CreateDestinoDto } from '../../domain/entities/dtos';
import { Destino } from '../../domain/entities/Destino';

@Injectable({
  providedIn: 'root'
})
export class CreateDestinoUseCase {
  constructor(private readonly destinoRepository: SupabaseDestinoRepository) {}

  async execute(destinoDto: CreateDestinoDto): Promise<Destino> {
    if (!destinoDto.nombre || !destinoDto.ciudad || !destinoDto.pais || !destinoDto.descripcion || !destinoDto.tipo_experiencia || !destinoDto.imagen) {
      throw new Error('Todos los campos son obligatorios');
    }

    return await this.destinoRepository.create(destinoDto);
  }
}
