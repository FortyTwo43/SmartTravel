import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorMetricsComponent } from './proveedor-metrics';

describe('ProveedorMetricsComponent', () => {
  let component: ProveedorMetricsComponent;
  let fixture: ComponentFixture<ProveedorMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorMetricsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorMetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
