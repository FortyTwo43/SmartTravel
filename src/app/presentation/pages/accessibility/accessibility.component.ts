import { Component, OnInit, ChangeDetectionStrategy, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { signal, computed } from '@angular/core';
import { FontSizeService, FontSizeLevel } from '../../service/font-size/font-size.service';
import { ThemeService } from '../../service/theme/theme.service';
import { LucideAngularModule, LUCIDE_ICONS, LucideIconProvider, RotateCcw } from 'lucide-angular';
import { VisualThemeComponent } from '../../components/ui/visual-theme/visual-theme.component';
import { TypographyComponent } from '../../components/ui/typography/typography.component';
import { AdjustmentsRowComponent, AdjustmentState } from '../../components/ui/adjustments-row/adjustments-row.component';
import { LanguagePreferenceComponent } from '../../components/ui/language-preference/language-preference.component';

type ThemeMode = 'light' | 'dark';
type LanguageCode = 'es' | 'en';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    LucideAngularModule,
    VisualThemeComponent,
    TypographyComponent,
    AdjustmentsRowComponent,
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
export class AccessibilityComponent implements OnInit {
  private fontSizeService = inject(FontSizeService);
  private translateService = inject(TranslateService);
  private themeService = inject(ThemeService);

  // Current state signals
  selectedTheme = signal<ThemeMode>('light');
  selectedFontSize = signal<FontSizeLevel>('normal');
  adjustments = signal<AdjustmentState>({
    highContrast: false,
    reduceMotion: false,
    screenReaderEnabled: false
  });
  selectedLanguage = signal<LanguageCode>('es');

  // Initial state for change detection
  private initialState = signal({
    theme: 'light' as ThemeMode,
    fontSize: 'normal' as FontSizeLevel,
    highContrast: false,
    reduceMotion: false,
    screenReaderEnabled: false,
    language: 'es' as LanguageCode
  });

  // Computed property to detect changes
  hasChanges = computed(() => {
    const current = this.initialState();
    const adj = this.adjustments();
    return (
      this.selectedTheme() !== current.theme ||
      this.selectedFontSize() !== current.fontSize ||
      adj.highContrast !== current.highContrast ||
      adj.reduceMotion !== current.reduceMotion ||
      adj.screenReaderEnabled !== current.screenReaderEnabled ||
      this.selectedLanguage() !== current.language
    );
  });

  isSaveDisabled = computed(() => !this.hasChanges());

  constructor() {
    // Apply theme changes reactively
    effect(() => {
      const theme = this.selectedTheme();
      this.themeService.setTheme(theme);
    });

    // Apply contrast preferences reactively
    effect(() => {
      const adj = this.adjustments();
      this.applyContrastPreference(adj.highContrast);
    });

    // Apply motion preferences reactively
    effect(() => {
      const adj = this.adjustments();
      this.applyMotionPreference(adj.reduceMotion);
    });
  }

  ngOnInit(): void {
    this.loadInitialState();
  }

  private loadInitialState(): void {
    // Load theme
    const savedTheme = (localStorage.getItem('smart-travel-theme') as ThemeMode) || 'light';
    this.selectedTheme.set(savedTheme);
    this.themeService.setTheme(savedTheme);

    // Load font size from FontSizeService
    const currentFontSize = this.fontSizeService.currentLevel();
    this.selectedFontSize.set(currentFontSize);

    // Load accessibility preferences
    const savedHighContrast = localStorage.getItem('smart-travel-high-contrast') === 'true';
    const savedReduceMotion = localStorage.getItem('smart-travel-reduce-motion') === 'true';
    const savedScreenReader = localStorage.getItem('smart-travel-screen-reader') === 'true';

    this.adjustments.set({
      highContrast: savedHighContrast,
      reduceMotion: savedReduceMotion,
      screenReaderEnabled: savedScreenReader
    });

    // Load language
    const savedLanguage = (localStorage.getItem('smart-travel-language') as LanguageCode) || 'es';
    this.selectedLanguage.set(savedLanguage);

    // Set initial state for change detection
    this.initialState.set({
      theme: savedTheme,
      fontSize: currentFontSize,
      highContrast: savedHighContrast,
      reduceMotion: savedReduceMotion,
      screenReaderEnabled: savedScreenReader,
      language: savedLanguage
    });

    this.applyMotionPreference(savedReduceMotion);
    this.applyContrastPreference(savedHighContrast);
  }

  saveChanges(): void {
    // Save theme
    localStorage.setItem('smart-travel-theme', this.selectedTheme());

    // Save font size via FontSizeService
    this.fontSizeService.setFontSize(this.selectedFontSize());

    // Save accessibility preferences
    const adj = this.adjustments();
    localStorage.setItem('smart-travel-high-contrast', adj.highContrast.toString());
    localStorage.setItem('smart-travel-reduce-motion', adj.reduceMotion.toString());
    localStorage.setItem('smart-travel-screen-reader', adj.screenReaderEnabled.toString());

    // Save language
    localStorage.setItem('smart-travel-language', this.selectedLanguage());
    this.translateService.use(this.selectedLanguage());

    // Update initial state to mark changes as saved
    this.initialState.set({
      theme: this.selectedTheme(),
      fontSize: this.selectedFontSize(),
      highContrast: adj.highContrast,
      reduceMotion: adj.reduceMotion,
      screenReaderEnabled: adj.screenReaderEnabled,
      language: this.selectedLanguage()
    });
  }

  resetPreferences(): void {
    // Reset to initial state
    const initial = this.initialState();
    this.selectedTheme.set(initial.theme);
    this.selectedFontSize.set(initial.fontSize);
    this.adjustments.set({
      highContrast: initial.highContrast,
      reduceMotion: initial.reduceMotion,
      screenReaderEnabled: initial.screenReaderEnabled
    });
    this.selectedLanguage.set(initial.language);
  }

  private applyMotionPreference(reduceMotion: boolean): void {
    if (reduceMotion) {
      document.documentElement.style.setProperty('--motion-safe', '0s');
    } else {
      document.documentElement.style.removeProperty('--motion-safe');
    }
  }

  private applyContrastPreference(highContrast: boolean): void {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  }

  // Event handlers from child components
  onThemeChange(theme: ThemeMode): void {
    this.selectedTheme.set(theme);
  }

  onFontSizeChange(fontSize: FontSizeLevel): void {
    this.selectedFontSize.set(fontSize);
  }

  onHighContrastChange(value: boolean): void {
    this.adjustments.update(adj => ({ ...adj, highContrast: value }));
  }

  onReduceMotionChange(value: boolean): void {
    this.adjustments.update(adj => ({ ...adj, reduceMotion: value }));
  }

  onScreenReaderChange(value: boolean): void {
    this.adjustments.update(adj => ({ ...adj, screenReaderEnabled: value }));
  }

  onLanguageChange(language: LanguageCode): void {
    this.selectedLanguage.set(language);
  }
}
