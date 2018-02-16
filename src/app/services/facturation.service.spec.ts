import { TestBed, inject } from '@angular/core/testing';

import { FacturationService } from './facturation.service';

describe('FacturationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FacturationService]
    });
  });

  it('should be created', inject([FacturationService], (service: FacturationService) => {
    expect(service).toBeTruthy();
  }));
});
