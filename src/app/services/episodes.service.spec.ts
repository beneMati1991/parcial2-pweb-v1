import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, inject } from '@angular/core/testing';

import { EpisodesService } from './episodes.service';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EpisodesService]
    });
    service = TestBed.inject(EpisodesService);
  });

  it('valor url base', () => {
    const url = service.baseUrl;
    expect(url).toContain('episode')
  });

  it('main service return 3 pages', () => {
    
    let variable = 3;
    service.getEpisodes().subscribe(
      data => {
        expect(data.info.pages).toBe(3);
        variable = data;
      }
    );
    expect(variable).toBe(3);
  })

});
