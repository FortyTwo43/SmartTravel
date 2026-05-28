import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorSidebar } from './proveedor-sidebar';

describe('ProveedorSidebar', () => {
  let component: ProveedorSidebar;
  let fixture: ComponentFixture<ProveedorSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
