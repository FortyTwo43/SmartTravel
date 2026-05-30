import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerSidebarComponent } from './traveler-sidebar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('TravelerSidebarComponent', () => {
  let component: TravelerSidebarComponent;
  let fixture: ComponentFixture<TravelerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerSidebarComponent, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have navigation items', () => {
    expect(component.navItems.length).toBeGreaterThan(0);
  });

  it('should set current route', () => {
    expect(component.currentRoute()).toBe('/traveler/dashboard');
  });
});
