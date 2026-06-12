import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosPieChart } from './ingresos-pie-chart';

describe('IngresosPieChart', () => {
  let component: IngresosPieChart;
  let fixture: ComponentFixture<IngresosPieChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresosPieChart],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresosPieChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
