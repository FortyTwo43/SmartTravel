import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerSidebarComponent } from './traveler-sidebar.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';

describe('TravelerSidebarComponent', () => {
  let component: TravelerSidebarComponent;
  let fixture: ComponentFixture<TravelerSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerSidebarComponent, TranslateModule.forRoot()],
      providers: [provideRouter([])]
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
