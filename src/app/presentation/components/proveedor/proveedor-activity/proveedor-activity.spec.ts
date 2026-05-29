import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedorActivityComponent } from './proveedor-activity';

describe('ProveedorActivityComponent', () => {
  let component: ProveedorActivityComponent;
  let fixture: ComponentFixture<ProveedorActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedorActivityComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProveedorActivityComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
