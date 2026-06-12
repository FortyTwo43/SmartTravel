import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoGallery } from './establecimiento-gallery';

describe('EstablecimientoGallery', () => {
  let component: EstablecimientoGallery;
  let fixture: ComponentFixture<EstablecimientoGallery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablecimientoGallery],
    }).compileComponents();

    fixture = TestBed.createComponent(EstablecimientoGallery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
