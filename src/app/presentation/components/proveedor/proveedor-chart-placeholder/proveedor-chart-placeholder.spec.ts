import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorChartPlaceholderComponent } from './proveedor-chart-placeholder';

describe('ProveedorChartPlaceholderComponent', () => {
  let component: ProveedorChartPlaceholderComponent;
  let fixture: ComponentFixture<ProveedorChartPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorChartPlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorChartPlaceholderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
