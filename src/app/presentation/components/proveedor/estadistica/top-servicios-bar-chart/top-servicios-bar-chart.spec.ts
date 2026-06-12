import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopServiciosBarChart } from './top-servicios-bar-chart';

describe('TopServiciosBarChart', () => {
  let component: TopServiciosBarChart;
  let fixture: ComponentFixture<TopServiciosBarChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopServiciosBarChart],
    }).compileComponents();

    fixture = TestBed.createComponent(TopServiciosBarChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
