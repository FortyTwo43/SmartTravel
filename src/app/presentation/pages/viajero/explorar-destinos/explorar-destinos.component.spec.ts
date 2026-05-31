import { describe, it, expect } from 'vitest';
import { ExplorarDestinosComponent } from './explorar-destinos.component';

describe('ExplorarDestinosComponent', () => {
  it('should be instantiable', () => {
    const comp = new ExplorarDestinosComponent();
    expect(comp).toBeInstanceOf(ExplorarDestinosComponent);
  });
});
