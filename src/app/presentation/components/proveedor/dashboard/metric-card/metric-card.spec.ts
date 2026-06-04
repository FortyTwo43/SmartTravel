import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MetricCardComponent } from './metric-card';

describe('MetricCardComponent', () => {
  let component: MetricCardComponent;
  let fixture: ComponentFixture<MetricCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MetricCardComponent, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(MetricCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
