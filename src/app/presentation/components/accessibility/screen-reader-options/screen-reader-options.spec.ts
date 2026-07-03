import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreenReaderOptions } from './screen-reader-options';

describe('ScreenReaderOptions', () => {
  let component: ScreenReaderOptions;
  let fixture: ComponentFixture<ScreenReaderOptions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScreenReaderOptions],
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenReaderOptions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
