import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsCardComponent } from './stats-card.component';
import { TranslateModule } from '@ngx-translate/core';

describe('StatsCardComponent', () => {
  let component: StatsCardComponent;
  let fixture: ComponentFixture<StatsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsCardComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StatsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct icon for stat key', () => {
    expect(component.getStatIcon('viajes_completados')).toBe('TrendingUp');
    expect(component.getStatIcon('destinos_visitados')).toBe('MapPin');
    expect(component.getStatIcon('favoritos')).toBe('Heart');
  });
});
