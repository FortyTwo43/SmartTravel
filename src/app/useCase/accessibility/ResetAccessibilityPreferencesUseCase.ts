import { Injectable, inject } from '@angular/core';
import { SaveAccessibilityPreferencesUseCase, AccessibilityPreferences } from './SaveAccessibilityPreferencesUseCase';

@Injectable({
  providedIn: 'root'
})
export class ResetAccessibilityPreferencesUseCase {
  private savePreferencesUseCase = inject(SaveAccessibilityPreferencesUseCase);

  private readonly DEFAULT_PREFERENCES: AccessibilityPreferences = {
    theme: 'system',
    fontSize: 'normal',
    language: 'es'
  };

  /**
   * Execute the use case to reset accessibility preferences to defaults
   * @returns The default accessibility preferences
   */
  execute(): AccessibilityPreferences {
    this.savePreferencesUseCase.execute(this.DEFAULT_PREFERENCES);
    return this.DEFAULT_PREFERENCES;
  }
}
