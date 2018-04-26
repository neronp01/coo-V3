import { TestBed, inject } from '@angular/core/testing';

import { OrnitaouaisService } from './ornitaouais.service';

describe('OrnitaouaisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrnitaouaisService]
    });
  });

  it('should be created', inject([OrnitaouaisService], (service: OrnitaouaisService) => {
    expect(service).toBeTruthy();
  }));
});
