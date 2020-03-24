import { TestBed } from '@angular/core/testing';

import { ReimbursmentService } from './reimbursment.service';

describe('ReimbursmentService', () => {
  let service: ReimbursmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReimbursmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
