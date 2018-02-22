import { TestBed, inject } from '@angular/core/testing';

import { EmailIdService } from './email-id.service';

describe('EmailIdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailIdService]
    });
  });

  it('should be created', inject([EmailIdService], (service: EmailIdService) => {
    expect(service).toBeTruthy();
  }));
});
