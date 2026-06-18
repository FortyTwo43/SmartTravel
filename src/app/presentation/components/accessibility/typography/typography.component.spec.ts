import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TypographyComponent } from './typography.component';
import { FontSizeService } from '../../../service/font-size/font-size.service';
import { describe, it, expect, vi } from 'vitest';

describe('TypographyComponent', () => {
  let component: TypographyComponent;
  let fixture: ComponentFixture<TypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyComponent, TranslateModule.forRoot()],
      providers: [FontSizeService]
    }).compileComponents();

    fixture = TestBed.createComponent(TypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit fontSizeChanged when font size is changed', () => {
    let emittedSize = null;
    component.fontSizeChanged.subscribe(size => {
      emittedSize = size;
    });

    component.onFontSizeChange({ target: { value: '2' } } as unknown as Event);
    
    // sizes[2] is 'large'
    expect(emittedSize).toBe('large');
  });

  it('should emit textSpacingChanged when text spacing is changed', () => {
    let emittedSpacing = null;
    component.textSpacingChanged.subscribe(spacing => {
      emittedSpacing = spacing;
    });

    component.onTextSpacingChange({ target: { value: '2' } } as unknown as Event);

    expect(emittedSpacing).toBe('large');
  });

  it('should get available font size levels', () => {
    expect(component.fontSizeLevels.length).toBeGreaterThan(0);
    expect(component.fontSizeLevels.some(l => l.level === 'small')).toBe(true);
  });
});
