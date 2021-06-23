import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { EpisodeObject, RootObject } from 'src/app/models/episode';
import { EpisodesService } from 'src/app/services/episodes.service';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css'],
})
export class EpisodeComponent implements OnInit {
  private episodes: Array<EpisodeObject> = [];
  public page = 1;
  public pageSize = 7;
  private pageJSON: number;

  constructor(
    public auth: AuthService,
    private episodesService: EpisodesService
  ) {
    this.getAllEpisodes();
  }

  ngOnInit(): void {}

  //Función que obtiene todos episodos que devuelve la API.
  getAllEpisodes() {
    this.episodesService.getEpisodes().subscribe(
      (data) => {
        this.pageJSON = data.info.pages;
        console.log(this.pageJSON);
        //this.episodes = data.results;
        for (let i = 1; i <= this.pageJSON; i++) {
          this.getAllEpisodesPaginado(i);
        }
        this.episodes  = this.episodes.sort()
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }

  getAllEpisodesPaginado(id: number) {
    this.episodesService.getEpisodesXPagina(id).subscribe(
      (data: RootObject) => {
        this.episodes = this.episodes.concat(data.results);
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }
}
