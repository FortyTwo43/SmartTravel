import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresosLineChart } from './ingresos-line-chart';

describe('IngresosLineChart', () => {
  let component: IngresosLineChart;
  let fixture: ComponentFixture<IngresosLineChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresosLineChart],
    }).compileComponents();

    fixture = TestBed.createComponent(IngresosLineChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
