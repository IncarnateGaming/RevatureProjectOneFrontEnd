import { TestBed } from '@angular/core/testing';

import { ListReimbursmentStatusesService } from './list-reimbursment-statuses.service';

describe('ListReimbursmentStatusesService', () => {
  let service: ListReimbursmentStatusesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListReimbursmentStatusesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
