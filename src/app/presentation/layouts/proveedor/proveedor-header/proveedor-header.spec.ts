import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorHeader } from './proveedor-header';

describe('ProveedorHeader', () => {
  let component: ProveedorHeader;
  let fixture: ComponentFixture<ProveedorHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
