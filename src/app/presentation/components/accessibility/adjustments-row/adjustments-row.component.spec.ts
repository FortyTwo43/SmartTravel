import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AdjustmentsRowComponent } from './adjustments-row.component';
import { describe, it, expect } from 'vitest';

describe('AdjustmentsRowComponent', () => {
  let component: AdjustmentsRowComponent;
  let fixture: ComponentFixture<AdjustmentsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustmentsRowComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdjustmentsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit highContrastChanged when high contrast is toggled', () => {
    let emitted = false;
    component.highContrastChanged.subscribe(value => {
      expect(value).toBe(true);
      emitted = true;
    });

    component.onHighContrastChange({ target: { checked: true } } as unknown as Event);
    expect(emitted).toBe(true);
  });

  it('should emit reduceMotionChanged when reduce motion is toggled', () => {
    let emitted = false;
    component.reduceMotionChanged.subscribe(value => {
      expect(value).toBe(true);
      emitted = true;
    });

    component.onReduceMotionChange({ target: { checked: true } } as unknown as Event);
    expect(emitted).toBe(true);
  });

  it('should emit screenReaderChanged when screen reader is toggled', () => {
    let emitted = false;
    component.screenReaderChanged.subscribe(value => {
      expect(value).toBe(true);
      emitted = true;
    });

    component.onScreenReaderChange({ target: { checked: true } } as unknown as Event);
    expect(emitted).toBe(true);
  });
});
