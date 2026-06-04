import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TravelerFilterSidebarComponent } from './traveler-filter-sidebar.component';
import { describe, it, expect } from 'vitest';

describe('TravelerFilterSidebarComponent', () => {
  let component: TravelerFilterSidebarComponent;
  let fixture: ComponentFixture<TravelerFilterSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelerFilterSidebarComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TravelerFilterSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle interes correctly', () => {
    const interesId = 'playa';
    component.toggleIntereses(interesId);
    expect(component.intereses()).toContain(interesId);
    
    component.toggleIntereses(interesId);
    expect(component.intereses()).not.toContain(interesId);
  });

  it('should set and clear rating', () => {
    component.setRating('4-5');
    expect(component.ratingFilter()).toBe('4-5');
    
    // clicking same again should clear it
    component.setRating('4-5');
    expect(component.ratingFilter()).toBeNull();
  });

  it('should set and clear experiencia', () => {
    component.setExperiencia('Romántica');
    expect(component.experiencia()).toBe('Romántica');
    
    component.setExperiencia('Romántica');
    expect(component.experiencia()).toBeNull();
  });

  it('should toggle pais correctly', () => {
    component.togglePais('España');
    expect(component.paises()).toContain('España');
    
    component.togglePais('España');
    expect(component.paises()).not.toContain('España');
  });

  it('should clear all filters', () => {
    component.toggleIntereses('aventura');
    component.setRating('3-1');
    component.setExperiencia('Familiar');
    component.togglePais('México');
    
    component.clearFilters();
    
    expect(component.intereses().length).toBe(0);
    expect(component.ratingFilter()).toBeNull();
    expect(component.experiencia()).toBeNull();
    expect(component.paises().length).toBe(0);
  });

  it('should emit correct payload on toggle', () => {
    let emittedPayload: any = null;
    component.applyFilters.subscribe(p => emittedPayload = p);
    
    component.setRating('4-5');
    expect(emittedPayload).toEqual({ ratingMin: 4, ratingMax: 5 });
  });
});
