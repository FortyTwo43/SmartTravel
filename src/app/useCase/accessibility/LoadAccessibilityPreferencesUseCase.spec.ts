import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { LoadAccessibilityPreferencesUseCase } from './LoadAccessibilityPreferencesUseCase';
import { ThemeService } from '../../presentation/service/theme/theme.service';
import { FontSizeService } from '../../presentation/service/font-size/font-size.service';
import { TextSpacingService } from '../../presentation/service/text-spacing/text-spacing.service';
import { LanguageService } from '../../presentation/service/language/language.service';

describe('LoadAccessibilityPreferencesUseCase', () => {
  let useCase: LoadAccessibilityPreferencesUseCase;
  let mockThemeService: any;
  let mockFontSizeService: { currentLevel: ReturnType<typeof vi.fn> };
  let mockTextSpacingService: { currentLevel: ReturnType<typeof vi.fn> };
  let mockLanguageService: { getCurrentLanguage: ReturnType<typeof vi.fn> };
  let localStorageMock: { getItem: ReturnType<typeof vi.fn>, setItem: ReturnType<typeof vi.fn>, clear: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockThemeService = {};
    mockFontSizeService = {
      currentLevel: vi.fn()
    };
    mockTextSpacingService = {
      currentLevel: vi.fn()
    };
    mockLanguageService = {
      getCurrentLanguage: vi.fn()
    };

    localStorageMock = {
      getItem: vi.fn(),
      setItem: vi.fn(),
      clear: vi.fn()
    };
    vi.stubGlobal('localStorage', localStorageMock);

    TestBed.configureTestingModule({
      providers: [
        LoadAccessibilityPreferencesUseCase,
        { provide: ThemeService, useValue: mockThemeService },
        { provide: FontSizeService, useValue: mockFontSizeService },
        { provide: TextSpacingService, useValue: mockTextSpacingService },
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    });

    useCase = TestBed.inject(LoadAccessibilityPreferencesUseCase);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should load preferences with saved theme', () => {
    localStorageMock.getItem.mockReturnValue('dark');
    mockFontSizeService.currentLevel.mockReturnValue('large');
    mockTextSpacingService.currentLevel.mockReturnValue('extra-large');
    mockLanguageService.getCurrentLanguage.mockReturnValue('en');

    const result = useCase.execute();

    expect(localStorageMock.getItem).toHaveBeenCalledWith('smart-travel-theme');
    expect(result).toEqual({
      theme: 'dark',
      fontSize: 'large',
      textSpacing: 'extra-large',
      language: 'en'
    });
  });

  it('should load preferences with default theme if none saved', () => {
    localStorageMock.getItem.mockReturnValue(null);
    mockFontSizeService.currentLevel.mockReturnValue('normal');
    mockTextSpacingService.currentLevel.mockReturnValue('normal');
    mockLanguageService.getCurrentLanguage.mockReturnValue('es');

    const result = useCase.execute();

    expect(result).toEqual({
      theme: 'system',
      fontSize: 'normal',
      textSpacing: 'normal',
      language: 'es'
    });
  });
});
