import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChangeFontSizeUseCase } from './ChangeFontSizeUseCase';
import { FontSizeService } from '../../presentation/service/font-size/font-size.service';

describe('ChangeFontSizeUseCase', () => {
  let useCase: ChangeFontSizeUseCase;
  let mockFontSizeService: { setFontSize: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockFontSizeService = {
      setFontSize: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ChangeFontSizeUseCase,
        { provide: FontSizeService, useValue: mockFontSizeService }
      ]
    });

    useCase = TestBed.inject(ChangeFontSizeUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call setFontSize with "small"', () => {
    useCase.execute('small');
    expect(mockFontSizeService.setFontSize).toHaveBeenCalledWith('small');
  });

  it('should call setFontSize with "normal"', () => {
    useCase.execute('normal');
    expect(mockFontSizeService.setFontSize).toHaveBeenCalledWith('normal');
  });

  it('should call setFontSize with "large"', () => {
    useCase.execute('large');
    expect(mockFontSizeService.setFontSize).toHaveBeenCalledWith('large');
  });

  it('should call setFontSize with "extra-large"', () => {
    useCase.execute('extra-large');
    expect(mockFontSizeService.setFontSize).toHaveBeenCalledWith('extra-large');
  });

  it('should delegate to FontSizeService exactly once per call', () => {
    useCase.execute('large');
    expect(mockFontSizeService.setFontSize).toHaveBeenCalledTimes(1);
  });
});
