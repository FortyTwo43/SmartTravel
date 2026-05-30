import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerDashboardComponent } from './traveler-dashboard.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { GetTravelerDashboardUseCase, DashboardData } from '../../../../useCase/viajero/dashboard/GetTravelerDashboardUseCase';

const mockDashboardData: DashboardData = {
  userName: 'TestUser',
  proximosViajes: [],
  destinosRecomendados: [],
  itinerariosRecientes: [],
  serviciosSugeridos: [],
  estadisticas: { viajes_completados: 0, destinos_visitados: 0, presupuesto: 0 }
};

describe('TravelerDashboardComponent', () => {
  let component: TravelerDashboardComponent;
  let fixture: ComponentFixture<TravelerDashboardComponent>;
  let mockDashboardUseCase: { execute: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockDashboardUseCase = {
      execute: vi.fn().mockResolvedValue(mockDashboardData)
    };

    await TestBed.configureTestingModule({
      imports: [TravelerDashboardComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: GetTravelerDashboardUseCase, useValue: mockDashboardUseCase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load dashboard data on init', async () => {
    await new Promise(resolve => setTimeout(resolve, 100));
    expect(component.dashboardData()).toBeTruthy();
  });

  it('should handle loading state', () => {
    expect(component.isLoading()).toBeFalsy();
  });
});
