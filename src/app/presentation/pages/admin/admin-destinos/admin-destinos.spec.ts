import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDestinos } from './admin-destinos';

describe('AdminDestinos', () => {
  let component: AdminDestinos;
  let fixture: ComponentFixture<AdminDestinos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDestinos],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDestinos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
