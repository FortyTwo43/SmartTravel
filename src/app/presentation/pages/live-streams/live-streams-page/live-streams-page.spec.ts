import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveStreamsPage } from './live-streams-page';

describe('LiveStreamsPage', () => {
  let component: LiveStreamsPage;
  let fixture: ComponentFixture<LiveStreamsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiveStreamsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LiveStreamsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
