import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorHeaderComponent } from './proveedor-header';

describe('ProveedorHeaderComponent', () => {
  let component: ProveedorHeaderComponent;
  let fixture: ComponentFixture<ProveedorHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
