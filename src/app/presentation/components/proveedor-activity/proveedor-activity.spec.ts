import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorActivity } from './proveedor-activity';

describe('ProveedorActivity', () => {
  let component: ProveedorActivity;
  let fixture: ComponentFixture<ProveedorActivity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorActivity],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorActivity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
