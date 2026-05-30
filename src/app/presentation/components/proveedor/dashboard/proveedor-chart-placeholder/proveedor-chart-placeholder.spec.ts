import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorChartPlaceholderComponent } from './proveedor-chart-placeholder';
import { provideEchartsCore } from 'ngx-echarts';

// Polyfill for ResizeObserver
if (typeof window !== 'undefined' && !window.ResizeObserver) {
  (window as any).ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

describe('ProveedorChartPlaceholderComponent', () => {
  let component: ProveedorChartPlaceholderComponent;
  let fixture: ComponentFixture<ProveedorChartPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorChartPlaceholderComponent, TranslateModule.forRoot()],
      providers: [provideEchartsCore({ echarts: () => import('echarts') })],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorChartPlaceholderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
