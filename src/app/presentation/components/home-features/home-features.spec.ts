import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HomeFeatures } from './home-features';

describe('HomeFeatures', () => {
  let component: HomeFeatures;
  let fixture: ComponentFixture<HomeFeatures>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeFeatures, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeFeatures);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
