import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservasStatusDonutChart } from './reservas-status-donut-chart';

describe('ReservasStatusDonutChart', () => {
  let component: ReservasStatusDonutChart;
  let fixture: ComponentFixture<ReservasStatusDonutChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservasStatusDonutChart],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservasStatusDonutChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
