import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AccessibilityComponent } from './accessibility.component';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signal } from '@angular/core';

import {
  ChangeThemeUseCase,
  ChangeFontSizeUseCase,
  ChangeTextSpacingUseCase,
  ChangeLanguageUseCase,
  SaveAccessibilityPreferencesUseCase,
  LoadAccessibilityPreferencesUseCase,
  ResetAccessibilityPreferencesUseCase
} from '../../../useCase/accessibility';

describe('AccessibilityComponent', () => {
  let component: AccessibilityComponent;
  let fixture: ComponentFixture<AccessibilityComponent>;
  let mockChangeThemeUseCase: any;
  let mockChangeFontSizeUseCase: any;
  let mockChangeTextSpacingUseCase: any;
  let mockChangeLanguageUseCase: any;
  let mockSavePreferencesUseCase: any;
  let mockLoadPreferencesUseCase: any;
  let mockResetPreferencesUseCase: any;

  beforeEach(async () => {
    mockChangeThemeUseCase = { execute: vi.fn() };
    mockChangeFontSizeUseCase = { execute: vi.fn() };
    mockChangeTextSpacingUseCase = { execute: vi.fn() };
    mockChangeLanguageUseCase = { execute: vi.fn() };
    mockSavePreferencesUseCase = { execute: vi.fn() };
    mockLoadPreferencesUseCase = { 
      execute: vi.fn().mockReturnValue({
        theme: 'system',
        fontSize: 'normal',
        textSpacing: 'normal',
        language: 'es'
      })
    };
    mockResetPreferencesUseCase = { 
      execute: vi.fn().mockReturnValue({
        theme: 'system',
        fontSize: 'normal',
        textSpacing: 'normal',
        language: 'es'
      })
    };

    await TestBed.configureTestingModule({
      imports: [AccessibilityComponent, TranslateModule.forRoot()],
      providers: [
        { provide: ChangeThemeUseCase, useValue: mockChangeThemeUseCase },
        { provide: ChangeFontSizeUseCase, useValue: mockChangeFontSizeUseCase },
        { provide: ChangeTextSpacingUseCase, useValue: mockChangeTextSpacingUseCase },
        { provide: ChangeLanguageUseCase, useValue: mockChangeLanguageUseCase },
        { provide: SaveAccessibilityPreferencesUseCase, useValue: mockSavePreferencesUseCase },
        { provide: LoadAccessibilityPreferencesUseCase, useValue: mockLoadPreferencesUseCase },
        { provide: ResetAccessibilityPreferencesUseCase, useValue: mockResetPreferencesUseCase }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessibilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // calls ngOnInit
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial state on init', () => {
    expect(mockLoadPreferencesUseCase.execute).toHaveBeenCalled();
    expect(component.selectedTheme()).toBe('system');
    expect(component.selectedFontSize()).toBe('normal');
    expect(component.selectedTextSpacing()).toBe('normal');
    expect(component.selectedLanguage()).toBe('es');
  });

  it('should detect changes when theme is modified', () => {
    component.onThemeChange('dark');
    expect(component.selectedTheme()).toBe('dark');
    expect(mockChangeThemeUseCase.execute).toHaveBeenCalledWith('dark');
    expect(component.hasChanges()).toBe(true);
    expect(component.isSaveDisabled()).toBe(false);
  });

  it('should detect changes when font size is modified', () => {
    component.onFontSizeChange('large');
    expect(component.selectedFontSize()).toBe('large');
    expect(mockChangeFontSizeUseCase.execute).toHaveBeenCalledWith('large');
    expect(component.hasChanges()).toBe(true);
  });

  it('should detect changes when text spacing is modified', () => {
    component.onTextSpacingChange('large');
    expect(component.selectedTextSpacing()).toBe('large');
    expect(mockChangeTextSpacingUseCase.execute).toHaveBeenCalledWith('large');
    expect(component.hasChanges()).toBe(true);
  });

  it('should detect changes when language is modified', () => {
    component.onLanguageChange('en');
    expect(component.selectedLanguage()).toBe('en');
    expect(mockChangeLanguageUseCase.execute).toHaveBeenCalledWith('en');
    expect(component.hasChanges()).toBe(true);
  });

  it('should not have changes initially', () => {
    expect(component.hasChanges()).toBe(false);
    expect(component.isSaveDisabled()).toBe(true);
  });

  it('should save changes and reset hasChanges', () => {
    component.onThemeChange('dark');
    expect(component.hasChanges()).toBe(true);
    
    component.saveChanges();
    
    expect(mockSavePreferencesUseCase.execute).toHaveBeenCalledWith({
      theme: 'dark',
      fontSize: 'normal',
      textSpacing: 'normal',
      language: 'es'
    });
    
    expect(component.hasChanges()).toBe(false);
  });

  it('should reset preferences to default values', () => {
    component.onThemeChange('dark');
    
    component.resetPreferences();
    
    expect(mockResetPreferencesUseCase.execute).toHaveBeenCalled();
    expect(component.selectedTheme()).toBe('system');
    expect(mockChangeThemeUseCase.execute).toHaveBeenCalledWith('system');
  });

  it('should revert changes on destroy if not saved', () => {
    component.onThemeChange('dark');
    
    component.ngOnDestroy();
    
    expect(mockChangeThemeUseCase.execute).toHaveBeenCalledWith('system');
    expect(component.selectedTheme()).toBe('system');
  });
});
