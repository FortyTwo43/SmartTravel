import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { VisualThemeComponent } from './visual-theme.component';
import { describe, it, expect } from 'vitest';

describe('VisualThemeComponent', () => {
  let component: VisualThemeComponent;
  let fixture: ComponentFixture<VisualThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VisualThemeComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisualThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit themeChanged when theme is selected', () => {
    let emittedTheme = null;
    component.themeChanged.subscribe(theme => {
      emittedTheme = theme;
    });

    component.onThemeChange('dark');
    expect(emittedTheme).toBe('dark');
  });
});
