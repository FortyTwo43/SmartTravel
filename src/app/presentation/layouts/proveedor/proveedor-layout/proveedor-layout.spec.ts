import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorLayoutComponent } from './proveedor-layout';

describe('ProveedorLayoutComponent', () => {
  let component: ProveedorLayoutComponent;
  let fixture: ComponentFixture<ProveedorLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorLayoutComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
