import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { TypographyComponent } from './typography.component';
import { FontSizeService } from '../../../service/font-size/font-size.service';

describe('TypographyComponent', () => {
  let component: TypographyComponent;
  let fixture: ComponentFixture<TypographyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypographyComponent, TranslateModule.forRoot()],
      providers: [FontSizeService]
    }).compileComponents();

    fixture = TestBed.createComponent(TypographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit fontSizeChanged when font size is changed', (done) => {
    component.fontSizeChanged.subscribe(size => {
      expect(size).toBe('large');
      done();
    });

    component.onFontSizeChange('2');
  });

  it('should get available font size levels', () => {
    expect(component.fontSizeLevels.length).toBeGreaterThan(0);
    expect(component.fontSizeLevels.some(l => l.level === 'small')).toBe(true);
  });
});
