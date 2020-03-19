import { TestBed } from '@angular/core/testing';

import { PokecallService } from './pokecall.service';

describe('PokecallService', () => {
  let service: PokecallService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokecallService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
