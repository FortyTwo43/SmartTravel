import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerDashboardComponent } from './traveler-dashboard.component';

describe('TravelerDashboardComponent', () => {
  let component: TravelerDashboardComponent;
  let fixture: ComponentFixture<TravelerDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerDashboardComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', (done) => {
    setTimeout(() => {
      expect(component.dashboardData()).toBeTruthy();
      done();
    }, 100);
  });

  it('should handle loading state', () => {
    expect(component.isLoading()).toBeFalsy();
  });
});
