import { TestBed } from '@angular/core/testing';

import { Peliculas.ServiceService } from './peliculas.service.service';

describe('Peliculas.ServiceService', () => {
  let service: Peliculas.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Peliculas.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
