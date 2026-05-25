import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

import { HomeInfo } from './home-info';

describe('HomeInfo', () => {
  let component: HomeInfo;
  let fixture: ComponentFixture<HomeInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInfo, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
