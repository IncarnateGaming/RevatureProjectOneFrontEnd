import { TestBed } from '@angular/core/testing';

import { ListReimbursmentTypesService } from './list-reimbursment-types.service';

describe('ListReimbursmentTypesService', () => {
  let service: ListReimbursmentTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListReimbursmentTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
