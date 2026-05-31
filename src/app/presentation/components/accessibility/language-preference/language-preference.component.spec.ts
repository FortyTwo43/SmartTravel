import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { LanguagePreferenceComponent } from './language-preference.component';

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

  it('should emit languageChanged when language is selected', (done) => {
    component.languageChanged.subscribe(language => {
      expect(language).toBe('en');
      done();
    });

    component.onLanguageChange('en');
  });

  it('should have language options', () => {
    expect(component.languages.length).toBeGreaterThan(0);
  });
});
