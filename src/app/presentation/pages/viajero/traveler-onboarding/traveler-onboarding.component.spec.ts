import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelerOnboardingComponent } from './traveler-onboarding.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { InitializePerfilViajeroUseCase } from '../../../../useCase/traveler/InitializePerfilViajeroUseCase';

describe('TravelerOnboardingComponent', () => {
  let component: TravelerOnboardingComponent;
  let fixture: ComponentFixture<TravelerOnboardingComponent>;
  let mockInitializeUseCase: { execute: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    mockInitializeUseCase = { execute: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [TravelerOnboardingComponent, TranslateModule.forRoot()],
      providers: [
        provideRouter([]),
        { provide: InitializePerfilViajeroUseCase, useValue: mockInitializeUseCase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle interest when clicked', () => {
    const interest = 'deportes';
    expect(component.isInterestSelected(interest)).toBeFalsy();

    component.toggleInterest(interest);
    expect(component.isInterestSelected(interest)).toBeTruthy();

    component.toggleInterest(interest);
    expect(component.isInterestSelected(interest)).toBeFalsy();
  });

  it('should set travel type', () => {
    component.setTravelType('solo');
    expect(component.selectedTravelType()).toBe('solo');

    component.setTravelType('familia');
    expect(component.selectedTravelType()).toBe('familia');
  });

  it('should format budget correctly', () => {
    component.form.get('presupuesto')?.setValue(5000);
    expect(component.budgetFormatted()).toContain('5');
  });

  it('should have default interests selected', () => {
    expect(component.selectedInterests().length).toBeGreaterThan(0);
  });

  it('should have initial travel type', () => {
    expect(component.selectedTravelType()).toBe('pareja');
  });
});
