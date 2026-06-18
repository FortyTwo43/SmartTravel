import { TestBed } from '@angular/core/testing';

import { Multimedia } from './multimedia';

describe('Multimedia', () => {
  let service: Multimedia;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Multimedia);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
