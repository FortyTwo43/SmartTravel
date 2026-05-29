import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProveedorMetricsComponent } from './proveedor-metrics';

describe('ProveedorMetricsComponent', () => {
  let component: ProveedorMetricsComponent;
  let fixture: ComponentFixture<ProveedorMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorMetricsComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorMetricsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
