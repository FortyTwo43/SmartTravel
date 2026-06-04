import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChangeLanguageUseCase } from './ChangeLanguageUseCase';
import { LanguageService } from '../../presentation/service/language/language.service';

describe('ChangeLanguageUseCase', () => {
  let useCase: ChangeLanguageUseCase;
  let mockLanguageService: { applyLanguage: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockLanguageService = {
      applyLanguage: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ChangeLanguageUseCase,
        { provide: LanguageService, useValue: mockLanguageService }
      ]
    });

    useCase = TestBed.inject(ChangeLanguageUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call applyLanguage with "es"', () => {
    useCase.execute('es');
    expect(mockLanguageService.applyLanguage).toHaveBeenCalledWith('es');
  });

  it('should call applyLanguage with "en"', () => {
    useCase.execute('en');
    expect(mockLanguageService.applyLanguage).toHaveBeenCalledWith('en');
  });

  it('should delegate to LanguageService exactly once per call', () => {
    useCase.execute('es');
    expect(mockLanguageService.applyLanguage).toHaveBeenCalledTimes(1);
  });
});
