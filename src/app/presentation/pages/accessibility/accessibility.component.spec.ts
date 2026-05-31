import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AccessibilityComponent } from './accessibility.component';
import { FontSizeService } from '../../service/font-size/font-size.service';
import { ThemeService } from '../../service/theme/theme.service';

describe('AccessibilityComponent', () => {
  let component: AccessibilityComponent;
  let fixture: ComponentFixture<AccessibilityComponent>;
  let fontSizeService: FontSizeService;
  let themeService: ThemeService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibilityComponent, TranslateModule.forRoot()],
      providers: [FontSizeService, ThemeService]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessibilityComponent);
    component = fixture.componentInstance;
    fontSizeService = TestBed.inject(FontSizeService);
    themeService = TestBed.inject(ThemeService);
    
    // Clear localStorage before each test
    localStorage.clear();
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial state on init', () => {
    expect(component.selectedTheme()).toBeDefined();
    expect(component.selectedFontSize()).toBeDefined();
    expect(component.selectedLanguage()).toBeDefined();
  });

  it('should detect changes when theme is modified', () => {
    const initialTheme = component.selectedTheme();
    component.onThemeChange(initialTheme === 'light' ? 'dark' : 'light');
    
    expect(component.hasChanges()).toBe(true);
  });

  it('should disable save button when there are no changes', () => {
    expect(component.isSaveDisabled()).toBe(true);
  });

  it('should enable save button when there are changes', () => {
    component.onThemeChange(component.selectedTheme() === 'light' ? 'dark' : 'light');
    
    expect(component.hasChanges()).toBe(true);
    expect(component.isSaveDisabled()).toBe(false);
  });

  it('should change font size level', () => {
    component.onFontSizeChange('large');
    expect(component.selectedFontSize()).toBe('large');

    component.onFontSizeChange('small');
    expect(component.selectedFontSize()).toBe('small');
  });

  it('should toggle high contrast setting', () => {
    const adj = component.adjustments();
    component.onHighContrastChange(!adj.highContrast);
    
    expect(component.adjustments().highContrast).toBe(!adj.highContrast);
  });

  it('should toggle reduce motion setting', () => {
    const adj = component.adjustments();
    component.onReduceMotionChange(!adj.reduceMotion);
    
    expect(component.adjustments().reduceMotion).toBe(!adj.reduceMotion);
  });

  it('should toggle screen reader setting', () => {
    const adj = component.adjustments();
    component.onScreenReaderChange(!adj.screenReaderEnabled);
    
    expect(component.adjustments().screenReaderEnabled).toBe(!adj.screenReaderEnabled);
  });

  it('should change language preference', () => {
    component.onLanguageChange('en');
    expect(component.selectedLanguage()).toBe('en');

    component.onLanguageChange('es');
    expect(component.selectedLanguage()).toBe('es');
  });

  it('should save changes to localStorage', () => {
    component.onThemeChange('dark');
    component.onLanguageChange('en');
    component.onHighContrastChange(true);
    
    component.saveChanges();
    
    expect(localStorage.getItem('smart-travel-theme')).toBe('dark');
    expect(localStorage.getItem('smart-travel-language')).toBe('en');
    expect(localStorage.getItem('smart-travel-high-contrast')).toBe('true');
  });

  it('should reset preferences to initial state', () => {
    const initialTheme = component.selectedTheme();
    const initialLanguage = component.selectedLanguage();
    
    component.onThemeChange(initialTheme === 'light' ? 'dark' : 'light');
    component.onLanguageChange(initialLanguage === 'es' ? 'en' : 'es');
    
    expect(component.hasChanges()).toBe(true);
    
    component.resetPreferences();
    
    expect(component.selectedTheme()).toBe(initialTheme);
    expect(component.selectedLanguage()).toBe(initialLanguage);
    expect(component.hasChanges()).toBe(false);
  });

  it('should have hasChanges return false after saving', () => {
    component.onThemeChange(component.selectedTheme() === 'light' ? 'dark' : 'light');
    expect(component.hasChanges()).toBe(true);
    
    component.saveChanges();
    
    expect(component.hasChanges()).toBe(false);
  });
});
