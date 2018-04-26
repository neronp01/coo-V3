import { TestBed, inject } from '@angular/core/testing';

import { TexteService } from './texte.service';

describe('TexteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TexteService]
    });
  });

  it('should be created', inject([TexteService], (service: TexteService) => {
    expect(service).toBeTruthy();
  }));
});
