import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SaveAccessibilityPreferencesUseCase } from './SaveAccessibilityPreferencesUseCase';
import { ThemeService } from '../../presentation/service/theme/theme.service';
import { FontSizeService } from '../../presentation/service/font-size/font-size.service';
import { LanguageService } from '../../presentation/service/language/language.service';

describe('SaveAccessibilityPreferencesUseCase', () => {
  let useCase: SaveAccessibilityPreferencesUseCase;
  let mockThemeService: { commitTheme: ReturnType<typeof vi.fn> };
  let mockFontSizeService: { commitFontSize: ReturnType<typeof vi.fn> };
  let mockLanguageService: { commitLanguage: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockThemeService = {
      commitTheme: vi.fn()
    };
    mockFontSizeService = {
      commitFontSize: vi.fn()
    };
    mockLanguageService = {
      commitLanguage: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        SaveAccessibilityPreferencesUseCase,
        { provide: ThemeService, useValue: mockThemeService },
        { provide: FontSizeService, useValue: mockFontSizeService },
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    });

    useCase = TestBed.inject(SaveAccessibilityPreferencesUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should save all preferences', () => {
    useCase.execute({
      theme: 'dark',
      fontSize: 'large',
      language: 'en'
    });

    expect(mockThemeService.commitTheme).toHaveBeenCalledWith('dark');
    expect(mockFontSizeService.commitFontSize).toHaveBeenCalledWith('large');
    expect(mockLanguageService.commitLanguage).toHaveBeenCalledWith('en');
  });
});
