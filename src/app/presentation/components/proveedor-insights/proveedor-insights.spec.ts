import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorInsights } from './proveedor-insights';

describe('ProveedorInsights', () => {
  let component: ProveedorInsights;
  let fixture: ComponentFixture<ProveedorInsights>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorInsights],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorInsights);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
