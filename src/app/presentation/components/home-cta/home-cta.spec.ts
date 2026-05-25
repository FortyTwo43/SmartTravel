import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HomeCta } from './home-cta';

describe('HomeCta', () => {
  let component: HomeCta;
  let fixture: ComponentFixture<HomeCta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeCta, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeCta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
