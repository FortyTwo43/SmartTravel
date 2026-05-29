import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorServicesComponent } from './proveedor-services';

describe('ProveedorServicesComponent', () => {
  let component: ProveedorServicesComponent;
  let fixture: ComponentFixture<ProveedorServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorServicesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServicesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
