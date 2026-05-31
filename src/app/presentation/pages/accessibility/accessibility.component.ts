import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { signal, computed } from '@angular/core';
import { FontSizeLevel } from '../../service/font-size/font-size.service';
import { LanguageCode } from '../../constants/languages.constant';
import { ThemeMode } from '../../constants/themes.constant';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, RotateCcw } from 'lucide-angular';
import { VisualThemeComponent } from '../../components/accessibility/visual-theme/visual-theme.component';
import { TypographyComponent } from '../../components/accessibility/typography/typography.component';
import { LanguagePreferenceComponent } from '../../components/accessibility/language-preference/language-preference.component';
import {
  ChangeThemeUseCase,
  ChangeFontSizeUseCase,
  ChangeLanguageUseCase,
  SaveAccessibilityPreferencesUseCase,
  LoadAccessibilityPreferencesUseCase,
  ResetAccessibilityPreferencesUseCase
} from '../../../useCase/accessibility';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    VisualThemeComponent,
    TypographyComponent,
    LanguagePreferenceComponent
  ],
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ RotateCcw })
  }],
  templateUrl: './accessibility.component.html',
  styleUrl: './accessibility.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccessibilityComponent implements OnInit, OnDestroy {
    // Use Cases
    private changeThemeUseCase = inject(ChangeThemeUseCase);
    private changeFontSizeUseCase = inject(ChangeFontSizeUseCase);
    private changeLanguageUseCase = inject(ChangeLanguageUseCase);
    private savePreferencesUseCase = inject(SaveAccessibilityPreferencesUseCase);
    private loadPreferencesUseCase = inject(LoadAccessibilityPreferencesUseCase);
    private resetPreferencesUseCase = inject(ResetAccessibilityPreferencesUseCase);

    // Current state signals
    selectedTheme = signal<ThemeMode>('system');
    selectedFontSize = signal<FontSizeLevel>('normal');
    selectedLanguage = signal<LanguageCode>('es');

    // Initial state for change detection
    private initialState = signal({
        theme: 'system' as ThemeMode,
        fontSize: 'normal' as FontSizeLevel,
        language: 'es' as LanguageCode
    });

    // Computed property to detect changes
    hasChanges = computed(() => {
        const current = this.initialState();
        return (
        this.selectedTheme() !== current.theme ||
        this.selectedFontSize() !== current.fontSize ||
        this.selectedLanguage() !== current.language
        );
    });

    isSaveDisabled = computed(() => !this.hasChanges());

    ngOnInit(): void {
        this.loadInitialState();
    }

    private loadInitialState(): void {
        // Load preferences using use case
        const preferences = this.loadPreferencesUseCase.execute();

        // Set state signals
        this.selectedTheme.set(preferences.theme);
        this.selectedFontSize.set(preferences.fontSize);
        this.selectedLanguage.set(preferences.language);

        // Set initial state for change detection
        this.initialState.set({
        theme: preferences.theme,
        fontSize: preferences.fontSize,
        language: preferences.language
        });
    }

    saveChanges(): void {
        // Save all preferences using use case
        this.savePreferencesUseCase.execute({
        theme: this.selectedTheme(),
        fontSize: this.selectedFontSize(),
        language: this.selectedLanguage()
        });

        // Update initial state to mark changes as saved
        this.initialState.set({
        theme: this.selectedTheme(),
        fontSize: this.selectedFontSize(),
        language: this.selectedLanguage()
        });
    }

    ngOnDestroy(): void {
        if (!this.hasChanges()) {
            return;
        }

        const committed = this.initialState();

        this.changeThemeUseCase.execute(committed.theme);
        this.changeFontSizeUseCase.execute(committed.fontSize);
        this.changeLanguageUseCase.execute(committed.language);

        this.selectedTheme.set(committed.theme);
        this.selectedFontSize.set(committed.fontSize);
        this.selectedLanguage.set(committed.language);
    }

    resetPreferences(): void {
        // Reset to defaults using use case
        const preferences = this.resetPreferencesUseCase.execute();

        // Update state signals
        this.selectedTheme.set(preferences.theme);
        this.selectedFontSize.set(preferences.fontSize);
        this.selectedLanguage.set(preferences.language);

        // Apply preview immediately without persisting until save
        this.changeThemeUseCase.execute(preferences.theme);
        this.changeFontSizeUseCase.execute(preferences.fontSize);
        this.changeLanguageUseCase.execute(preferences.language);
    }

    // Event handlers from child components
    onThemeChange(theme: ThemeMode): void {
        this.selectedTheme.set(theme);
        // Apply immediately for real-time feedback
        this.changeThemeUseCase.execute(theme);
    }

    onFontSizeChange(fontSize: FontSizeLevel): void {
        this.selectedFontSize.set(fontSize);
        // Apply immediately for real-time feedback
        this.changeFontSizeUseCase.execute(fontSize);
    }

    onLanguageChange(language: LanguageCode): void {
        this.selectedLanguage.set(language);
        // Apply immediately for real-time feedback
        this.changeLanguageUseCase.execute(language);
    }
}