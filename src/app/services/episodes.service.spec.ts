import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Episode } from '../models/episode';
import { EpisodesService } from './episodes.service';

describe('EpisodesService', () => {
  let service: EpisodesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [EpisodesService],
    });
    service = TestBed.inject(EpisodesService);
  });

  it('valor url base', () => {
    const url = service.baseUrl;
    expect(url).toContain('episode');
  });

  it('service traer episodio Total Rickall', (done: DoneFn) => {
    service.getBuscarEpisodios('Total Rickall').subscribe((data: Episode) => {
      expect(data.results[0].name).toEqual('Total Rickall');
      done();
    });
  });
});
