import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { signal, computed } from '@angular/core';
import { FontSizeLevel } from '../../service/font-size/font-size.service';
import { TextSpacingLevel } from '../../service/text-spacing/text-spacing.service';
import { LanguageCode } from '../../constants/languages.constant';
import { ThemeMode } from '../../constants/themes.constant';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, RotateCcw } from 'lucide-angular';
import { VisualThemeComponent } from '../../components/accessibility/visual-theme/visual-theme.component';
import { TypographyComponent } from '../../components/accessibility/typography/typography.component';
import { LanguagePreferenceComponent } from '../../components/accessibility/language-preference/language-preference.component';
import { ContrastColor } from '../../components/accessibility/contrast-color/contrast-color';
import { AnimationsMovement } from '../../components/accessibility/animations-movement/animations-movement';
import { NavigationFocus } from '../../components/accessibility/navigation-focus/navigation-focus';
import { KeyboardShortcuts } from '../../components/accessibility/keyboard-shortcuts/keyboard-shortcuts';
import { Multimedia } from '../../components/accessibility/multimedia/multimedia';
import { MultimediaService } from '../../service/multimedia/multimedia';
import { AnimationsService } from '../../service/animations/animations.service';
import {
  ChangeThemeUseCase,
  ChangeFontSizeUseCase,
  ChangeTextSpacingUseCase,
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
    LanguagePreferenceComponent,
    ContrastColor,
    AnimationsMovement,
    NavigationFocus,
    KeyboardShortcuts,
    Multimedia
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
    private changeTextSpacingUseCase = inject(ChangeTextSpacingUseCase);
    private changeLanguageUseCase = inject(ChangeLanguageUseCase);
    private savePreferencesUseCase = inject(SaveAccessibilityPreferencesUseCase);
    private loadPreferencesUseCase = inject(LoadAccessibilityPreferencesUseCase);
    private resetPreferencesUseCase = inject(ResetAccessibilityPreferencesUseCase);
    public multimediaService = inject(MultimediaService);
    public animationsService = inject(AnimationsService);

    // Current state signals
    selectedTheme = signal<ThemeMode>('system');
    selectedFontSize = signal<FontSizeLevel>('normal');
    selectedTextSpacing = signal<TextSpacingLevel>('normal');
    selectedLanguage = signal<LanguageCode>('es');
    
    selectedMultimedia = signal({
        pauseAutoAudio: true,
        textTranscripts: false,
        syncCaptions: false,
        audioDescription: false,
        realtimeCaptions: false
    });
    
    selectedAnimations = signal({
        tooltipsMenus: false,
        pauseMotion: false,
        disableFlashing: false
    });

    // Initial state for change detection
    private initialState = signal({
        theme: 'system' as ThemeMode,
        fontSize: 'normal' as FontSizeLevel,
        textSpacing: 'normal' as TextSpacingLevel,
        language: 'es' as LanguageCode,
        multimedia: { pauseAutoAudio: true, textTranscripts: false, syncCaptions: false, audioDescription: false, realtimeCaptions: false },
        animations: { tooltipsMenus: false, pauseMotion: false, disableFlashing: false }
    });

    // Computed property to detect changes
    hasChanges = computed(() => {
        const current = this.initialState();
        return (
        this.selectedTheme() !== current.theme ||
        this.selectedFontSize() !== current.fontSize ||
        this.selectedTextSpacing() !== current.textSpacing ||
        this.selectedLanguage() !== current.language ||
        JSON.stringify(this.selectedMultimedia()) !== JSON.stringify(current.multimedia) ||
        JSON.stringify(this.selectedAnimations()) !== JSON.stringify(current.animations)
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
        this.selectedTextSpacing.set(preferences.textSpacing);
        this.selectedLanguage.set(preferences.language);
        this.selectedMultimedia.set(preferences.multimedia);
        this.selectedAnimations.set(preferences.animations);

        // Set initial state for change detection
        this.initialState.set({
        theme: preferences.theme,
        fontSize: preferences.fontSize,
        textSpacing: preferences.textSpacing,
        language: preferences.language,
        multimedia: preferences.multimedia,
        animations: preferences.animations
        });
    }

    saveChanges(): void {
        // Save all preferences using use case
        this.savePreferencesUseCase.execute({
        theme: this.selectedTheme(),
        fontSize: this.selectedFontSize(),
        textSpacing: this.selectedTextSpacing(),
        language: this.selectedLanguage(),
        multimedia: this.selectedMultimedia(),
        animations: this.selectedAnimations()
        });

        // Update initial state to mark changes as saved
        this.initialState.set({
        theme: this.selectedTheme(),
        fontSize: this.selectedFontSize(),
        textSpacing: this.selectedTextSpacing(),
        language: this.selectedLanguage(),
        multimedia: this.selectedMultimedia(),
        animations: this.selectedAnimations()
        });
    }

    ngOnDestroy(): void {
        if (!this.hasChanges()) {
            return;
        }

        const committed = this.initialState();

        this.changeThemeUseCase.execute(committed.theme);
        this.changeFontSizeUseCase.execute(committed.fontSize);
        this.changeTextSpacingUseCase.execute(committed.textSpacing);
        this.changeLanguageUseCase.execute(committed.language);
        
        this.multimediaService.setPreferences(committed.multimedia);
        this.animationsService.setPreferences(committed.animations);

        this.selectedTheme.set(committed.theme);
        this.selectedFontSize.set(committed.fontSize);
        this.selectedTextSpacing.set(committed.textSpacing);
        this.selectedLanguage.set(committed.language);
        this.selectedMultimedia.set(committed.multimedia);
        this.selectedAnimations.set(committed.animations);
    }

    resetPreferences(): void {
        // Reset to defaults using use case
        const preferences = this.resetPreferencesUseCase.execute();

        // Update state signals
        this.selectedTheme.set(preferences.theme);
        this.selectedFontSize.set(preferences.fontSize);
        this.selectedTextSpacing.set(preferences.textSpacing);
        this.selectedLanguage.set(preferences.language);
        this.selectedMultimedia.set(preferences.multimedia);
        this.selectedAnimations.set(preferences.animations);

        // Apply preview immediately without persisting until save
        this.changeThemeUseCase.execute(preferences.theme);
        this.changeFontSizeUseCase.execute(preferences.fontSize);
        this.changeTextSpacingUseCase.execute(preferences.textSpacing);
        this.changeLanguageUseCase.execute(preferences.language);
        this.multimediaService.setPreferences(preferences.multimedia);
        this.animationsService.setPreferences(preferences.animations);
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

    onTextSpacingChange(textSpacing: TextSpacingLevel): void {
        this.selectedTextSpacing.set(textSpacing);
        // Apply immediately for real-time feedback
        this.changeTextSpacingUseCase.execute(textSpacing);
    }

    onLanguageChange(language: LanguageCode): void {
        this.selectedLanguage.set(language);
        // Apply immediately for real-time feedback
        this.changeLanguageUseCase.execute(language);
    }

    onMultimediaChange(key: string, value: boolean): void {
        const current = { ...this.selectedMultimedia() };
        (current as any)[key] = value;
        this.selectedMultimedia.set(current);
        this.multimediaService.setPreferences(current);
    }

    onAnimationsChange(key: string, value: boolean): void {
        const current = { ...this.selectedAnimations() };
        (current as any)[key] = value;
        this.selectedAnimations.set(current);
        this.animationsService.setPreferences(current);
    }
}