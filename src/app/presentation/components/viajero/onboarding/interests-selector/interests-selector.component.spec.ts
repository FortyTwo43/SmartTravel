import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InterestsSelectorComponent, Interest } from './interests-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentRef } from '@angular/core';
import { vi } from 'vitest';

const mockInterests: Interest[] = [
  { id: 'deportes', label: 'Sports', icon: 'Activity' },
  { id: 'cocina', label: 'Cuisine', icon: 'Utensils' },
];

describe('InterestsSelectorComponent', () => {
  let component: InterestsSelectorComponent;
  let fixture: ComponentFixture<InterestsSelectorComponent>;
  let componentRef: ComponentRef<InterestsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InterestsSelectorComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterestsSelectorComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;

    // Set required inputs
    componentRef.setInput('interests', mockInterests);
    componentRef.setInput('selectedInterests', ['cocina']);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for selected interest', () => {
    expect(component.isSelected('cocina')).toBe(true);
  });

  it('should return false for non-selected interest', () => {
    expect(component.isSelected('deportes')).toBe(false);
  });

  it('should emit interestToggled when toggle is called', () => {
    const spy = vi.fn();
    component.interestToggled.subscribe(spy);
    component.toggle('deportes');
    expect(spy).toHaveBeenCalledWith('deportes');
  });
});
