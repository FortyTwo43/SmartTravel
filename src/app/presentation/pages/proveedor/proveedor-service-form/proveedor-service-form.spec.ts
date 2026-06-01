import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorServiceForm } from './proveedor-service-form';

describe('ProveedorServiceForm', () => {
  let component: ProveedorServiceForm;
  let fixture: ComponentFixture<ProveedorServiceForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorServiceForm],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServiceForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
