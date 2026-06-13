import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorEstablecimiento } from './proveedor-establecimiento';

describe('ProveedorEstablecimiento', () => {
  let component: ProveedorEstablecimiento;
  let fixture: ComponentFixture<ProveedorEstablecimiento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorEstablecimiento],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorEstablecimiento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
