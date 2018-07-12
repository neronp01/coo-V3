import { TestBed, inject } from '@angular/core/testing';

import { RapportService } from './rapport.service';

describe('RapportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RapportService]
    });
  });

  it('should be created', inject([RapportService], (service: RapportService) => {
    expect(service).toBeTruthy();
  }));
});
