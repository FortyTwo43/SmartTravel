import { Injectable, signal } from '@angular/core';
import { EstablecimientoTuristico } from '../../../domain/entities';

@Injectable({ providedIn: 'root' })
export class SharedEstablishmentService {
  establishment = signal<EstablecimientoTuristico | null>(null);

  setEstablishment(establishment: EstablecimientoTuristico | null): void {
    this.establishment.set(establishment);
  }
}
