import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasBarChart } from './reservas-bar-chart';

describe('ReservasBarChart', () => {
  let component: ReservasBarChart;
  let fixture: ComponentFixture<ReservasBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasBarChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasBarChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
