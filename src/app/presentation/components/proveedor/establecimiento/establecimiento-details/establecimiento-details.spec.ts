import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstablecimientoDetails } from './establecimiento-details';

describe('EstablecimientoDetails', () => {
  let component: EstablecimientoDetails;
  let fixture: ComponentFixture<EstablecimientoDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstablecimientoDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(EstablecimientoDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
