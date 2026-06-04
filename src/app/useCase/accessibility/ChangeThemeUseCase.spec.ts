import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChangeThemeUseCase } from './ChangeThemeUseCase';
import { ThemeService } from '../../presentation/service/theme/theme.service';

describe('ChangeThemeUseCase', () => {
  let useCase: ChangeThemeUseCase;
  let mockThemeService: { setTheme: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockThemeService = {
      setTheme: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ChangeThemeUseCase,
        { provide: ThemeService, useValue: mockThemeService }
      ]
    });

    useCase = TestBed.inject(ChangeThemeUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call setTheme with "light"', () => {
    useCase.execute('light');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('light');
  });

  it('should call setTheme with "dark"', () => {
    useCase.execute('dark');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('dark');
  });

  it('should call setTheme with "system"', () => {
    useCase.execute('system');
    expect(mockThemeService.setTheme).toHaveBeenCalledWith('system');
  });

  it('should delegate to ThemeService exactly once per call', () => {
    useCase.execute('dark');
    expect(mockThemeService.setTheme).toHaveBeenCalledTimes(1);
  });
});
