import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CharactersService } from './characters.service';

describe('CharactersService', () => {
  let service: CharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CharactersService]
    });
    service = TestBed.inject(CharactersService);
  });

  it('valor url base', () => {
    const url = service.baseUrl;
    expect(url).toContain('character')
  });

});
