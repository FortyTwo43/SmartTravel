import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePreferenceComponent } from './language-preference.component';
import { describe, it, expect } from 'vitest';

describe('LanguagePreferenceComponent', () => {
  let component: LanguagePreferenceComponent;
  let fixture: ComponentFixture<LanguagePreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguagePreferenceComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LanguagePreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit languageChanged when language is selected', () => {
    let emittedLanguage = null;
    component.languageChanged.subscribe(language => {
      emittedLanguage = language;
    });

    component.onLanguageChange('en');
    expect(emittedLanguage).toBe('en');
  });

  it('should have language options', () => {
    expect(component.languages.length).toBeGreaterThan(0);
  });
});
