import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { AdjustmentsRowComponent } from './adjustments-row.component';

describe('AdjustmentsRowComponent', () => {
  let component: AdjustmentsRowComponent;
  let fixture: ComponentFixture<AdjustmentsRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdjustmentsRowComponent, TranslateModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdjustmentsRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit highContrastChanged when high contrast is toggled', (done) => {
    component.highContrastChanged.subscribe(value => {
      expect(value).toBe(true);
      done();
    });

    component.onHighContrastChange(true);
  });

  it('should emit reduceMotionChanged when reduce motion is toggled', (done) => {
    component.reduceMotionChanged.subscribe(value => {
      expect(value).toBe(true);
      done();
    });

    component.onReduceMotionChange(true);
  });

  it('should emit screenReaderChanged when screen reader is toggled', (done) => {
    component.screenReaderChanged.subscribe(value => {
      expect(value).toBe(true);
      done();
    });

    component.onScreenReaderChange(true);
  });
});
