import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TravelPreferencesComponent, TravelType } from './travel-preferences.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ComponentRef } from '@angular/core';
import { vi } from 'vitest';

const mockTravelTypes: TravelType[] = [
  { id: 'solo', label: 'Solo' },
  { id: 'pareja', label: 'Couple' },
  { id: 'familia', label: 'Family' },
  { id: 'amigos', label: 'Friends' },
];

describe('TravelPreferencesComponent', () => {
  let component: TravelPreferencesComponent;
  let fixture: ComponentFixture<TravelPreferencesComponent>;
  let componentRef: ComponentRef<TravelPreferencesComponent>;
  let fb: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPreferencesComponent, TranslateModule.forRoot(), ReactiveFormsModule]
    }).compileComponents();

    fb = TestBed.inject(FormBuilder);
    fixture = TestBed.createComponent(TravelPreferencesComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Set required inputs
    componentRef.setInput('travelTypes', mockTravelTypes);
    componentRef.setInput('selectedTravelType', 'pareja');
    componentRef.setInput('form', fb.group({ presupuesto: [4500] }));
    componentRef.setInput('budgetFormatted', '€4.500');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have travel types input', () => {
    expect(component.travelTypes().length).toBe(4);
  });

  it('should have selectedTravelType input', () => {
    expect(component.selectedTravelType()).toBe('pareja');
  });

  it('should emit travelTypeChanged when select is called', () => {
    const spy = vi.fn();
    component.travelTypeChanged.subscribe(spy);
    component.select('solo');
    expect(spy).toHaveBeenCalledWith('solo');
  });

  it('should have budgetFormatted input', () => {
    expect(component.budgetFormatted()).toBe('€4.500');
  });
});
