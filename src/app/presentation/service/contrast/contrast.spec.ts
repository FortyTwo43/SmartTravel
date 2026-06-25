import { TestBed } from '@angular/core/testing';

import { Contrast } from './contrast';

describe('Contrast', () => {
  let service: Contrast;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Contrast);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
