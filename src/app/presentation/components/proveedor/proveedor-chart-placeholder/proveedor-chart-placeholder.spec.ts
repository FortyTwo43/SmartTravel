import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorChartPlaceholder } from './proveedor-chart-placeholder';

describe('ProveedorChartPlaceholder', () => {
  let component: ProveedorChartPlaceholder;
  let fixture: ComponentFixture<ProveedorChartPlaceholder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorChartPlaceholder],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorChartPlaceholder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
