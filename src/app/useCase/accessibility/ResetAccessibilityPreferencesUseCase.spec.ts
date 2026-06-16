import { TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { ResetAccessibilityPreferencesUseCase } from './ResetAccessibilityPreferencesUseCase';

describe('ResetAccessibilityPreferencesUseCase', () => {
  let useCase: ResetAccessibilityPreferencesUseCase;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResetAccessibilityPreferencesUseCase
      ]
    });

    useCase = TestBed.inject(ResetAccessibilityPreferencesUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return default preferences', () => {
    const result = useCase.execute();

    expect(result).toEqual({
      theme: 'system',
      fontSize: 'normal',
      textSpacing: 'normal',
      language: 'es'
    });
  });
});
