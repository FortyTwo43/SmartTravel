import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorServices } from './proveedor-services';

describe('ProveedorServices', () => {
  let component: ProveedorServices;
  let fixture: ComponentFixture<ProveedorServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorServices],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorServices);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
