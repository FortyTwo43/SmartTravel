import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorSidebarComponent } from './proveedor-sidebar';

describe('ProveedorSidebarComponent', () => {
  let component: ProveedorSidebarComponent;
  let fixture: ComponentFixture<ProveedorSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
