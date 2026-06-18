import { TestBed } from '@angular/core/testing';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChangeTextSpacingUseCase } from './ChangeTextSpacingUseCase';
import { TextSpacingService } from '../../presentation/service/text-spacing/text-spacing.service';

describe('ChangeTextSpacingUseCase', () => {
  let useCase: ChangeTextSpacingUseCase;
  let mockTextSpacingService: { setTextSpacing: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockTextSpacingService = {
      setTextSpacing: vi.fn()
    };

    TestBed.configureTestingModule({
      providers: [
        ChangeTextSpacingUseCase,
        { provide: TextSpacingService, useValue: mockTextSpacingService }
      ]
    });

    useCase = TestBed.inject(ChangeTextSpacingUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should call setTextSpacing with the given level', () => {
    useCase.execute('large');
    expect(mockTextSpacingService.setTextSpacing).toHaveBeenCalledWith('large');
  });

  it('should delegate to TextSpacingService exactly once per call', () => {
    useCase.execute('normal');
    expect(mockTextSpacingService.setTextSpacing).toHaveBeenCalledTimes(1);
  });
});
