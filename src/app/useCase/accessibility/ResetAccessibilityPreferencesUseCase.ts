import { Injectable, inject } from '@angular/core';
import { AccessibilityPreferences } from './SaveAccessibilityPreferencesUseCase';

@Injectable({
  providedIn: 'root'
})
export class ResetAccessibilityPreferencesUseCase {
  private readonly DEFAULT_PREFERENCES: AccessibilityPreferences = {
    theme: 'system',
    fontSize: 'normal',
    textSpacing: 'normal',
    language: 'es'
  };

  /**
   * Execute the use case to reset accessibility preferences to defaults
   * @returns The default accessibility preferences
   */
  execute(): AccessibilityPreferences {
    return this.DEFAULT_PREFERENCES;
  }
}
