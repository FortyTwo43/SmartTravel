import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorMetrics } from './proveedor-metrics';

describe('ProveedorMetrics', () => {
  let component: ProveedorMetrics;
  let fixture: ComponentFixture<ProveedorMetrics>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorMetrics],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorMetrics);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
