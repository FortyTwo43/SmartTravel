import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorInsightsComponent } from './proveedor-insights';

describe('ProveedorInsightsComponent', () => {
  let component: ProveedorInsightsComponent;
  let fixture: ComponentFixture<ProveedorInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorInsightsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorInsightsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
