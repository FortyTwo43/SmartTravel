import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExplorarDestinosComponent } from './explorar-destinos.component';
import { TranslateModule } from '@ngx-translate/core';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GetExplorarDestinosUseCase } from '../../../../useCase/viajero/explorar-destinos/GetExplorarDestinosUseCase';
import { provideRouter } from '@angular/router';

describe('ExplorarDestinosComponent', () => {
  let component: ExplorarDestinosComponent;
  let fixture: ComponentFixture<ExplorarDestinosComponent>;
  let mockUseCase: any;

  beforeEach(async () => {
    mockUseCase = {
      execute: vi.fn().mockResolvedValue([
        { id: '1', nombre: 'Paris', ratingPromedio: 4.5 }
      ])
    };

    await TestBed.configureTestingModule({
      imports: [ExplorarDestinosComponent, TranslateModule.forRoot()],
      providers: [
        { provide: GetExplorarDestinosUseCase, useValue: mockUseCase },
        provideRouter([]) // Needed for sidebar/header routing
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ExplorarDestinosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load destinos on init', async () => {
    await fixture.whenStable();
    expect(mockUseCase.execute).toHaveBeenCalled();
    expect(component.destinos().length).toBe(1);
    expect(component.isLoading()).toBe(false);
  });

  it('should apply filters and update list', async () => {
    mockUseCase.execute.mockResolvedValue([]);
    
    component.onApplyFilters({ experiencia: 'Playa' });
    expect(component.isLoading()).toBe(true);
    
    await fixture.whenStable();
    
    expect(mockUseCase.execute).toHaveBeenCalledWith({ experiencia: 'Playa' });
    expect(component.destinos().length).toBe(0);
    expect(component.error()).toBe('No se encontraron destinos con esos filtros.');
    expect(component.isLoading()).toBe(false);
  });

  it('should handle errors correctly', async () => {
    mockUseCase.execute.mockRejectedValue(new Error('Network error'));
    
    await component.loadDestinos();
    
    expect(component.error()).toBe('Network error');
    expect(component.isLoading()).toBe(false);
  });
});
