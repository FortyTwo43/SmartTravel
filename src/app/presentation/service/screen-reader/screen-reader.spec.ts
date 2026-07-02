import { TestBed } from '@angular/core/testing';

import { ScreenReader } from './screen-reader';

describe('ScreenReader', () => {
  let service: ScreenReader;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenReader);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
