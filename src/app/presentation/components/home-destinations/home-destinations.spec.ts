import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeDestinations } from './home-destinations';

describe('HomeDestinations', () => {
  let component: HomeDestinations;
  let fixture: ComponentFixture<HomeDestinations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeDestinations],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeDestinations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
