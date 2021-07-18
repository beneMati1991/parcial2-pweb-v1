import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { ToastrService } from 'ngx-toastr';
import { EpisodeObject, Episode } from 'src/app/models/episode';
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

  //Order
  private flagId = 0;
  private flagName = 0;
  private flagAirDate = 0;
  private flagEpisode = 0;

  constructor(
    public auth: AuthService,
    private episodesService: EpisodesService,
    private toastr: ToastrService
  ) {
    this.getAllEpisodes();
  }

  ngOnInit(): void {}

  //Función que obtiene todos episodos que devuelve la API.
  getAllEpisodes() {
    this.episodesService.getEpisodes().subscribe(
      (data) => {
        this.pageJSON = data.info.pages;

        //this.episodes = data.results;
        for (let i = 1; i <= this.pageJSON; i++) {
          this.getAllEpisodesPaginado(i);
        }
        this.episodes = this.episodes.sort();
      },
      (err) => {
        //console.log('Se produjo error: ' + err);
        this.toastr.error(err.status + ' ' + err.name, 'Ocurrio un error.');
      }
    );
  }

  getAllEpisodesPaginado(id: number) {
    this.episodesService.getEpisodesXPagina(id).subscribe(
      (data: Episode) => {
        this.episodes = this.episodes.concat(data.results);
      },
      (err) => {
        //console.log(err);
        this.toastr.error(err.status + ' ' + err.name, 'Ocurrio un error.');
      }
    );
  }

  buscarEpisodio(campo: string) {
    this.episodesService.getBuscarEpisodios(campo).subscribe(
      (data: any) => {
        this.pageJSON = data.info.pages;

        //this.episodes = data.results;
        for (let i = 1; i <= this.pageJSON; i++) {
          this.getAllEpisodesBuscarPaginado(campo,i);
        }
        //this.episodes = auxLista.sort();
        this.episodes = [];

        //this.episodes = data.results;
        this.flagId = 0;
        this.flagName = 0;
        this.flagAirDate = 0;
        this.flagEpisode = 0;
      },
      (err) => {
        this.episodes = []
        this.toastr.error('No existen elementos con ese nombre', 'Ocurrio un error.');
      }
    );
  }

  getAllEpisodesBuscarPaginado(campo: string, id: number) {
    this.episodesService.getBuscarEpisodiosXPagina(campo,id).subscribe(
      (data: Episode) => {
        this.episodes = this.episodes.concat(data.results);
      },
      (err) => {
        //console.log(err);
        this.toastr.error(err.status + ' ' + err.name, 'Ocurrio un error.');
      }
    );
  }

  sortById() {
    if (this.flagId == 1) {
      this.episodes = this.episodes.sort((a, b) => (a.id > b.id ? -1 : 1));
      this.flagId++;
      this.flagName = 0;
      this.flagAirDate = 0;
      this.flagEpisode = 0;
    } else {
      this.episodes = this.episodes.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.flagId++;
      this.flagName = 0;
      this.flagAirDate = 0;
      this.flagEpisode = 0;
    }

    if (this.flagId == 3) {
      this.flagId = 0;
    }
  }

  sortByName() {
    if (this.flagName == 1) {
      this.episodes = this.episodes.sort((a, b) => (a.name > b.name ? -1 : 1));
      this.flagName++;
      this.flagId = 0;
      this.flagAirDate = 0;
      this.flagEpisode = 0;
    } else {
      this.episodes = this.episodes.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.flagName++;
      this.flagId = 0;
      this.flagAirDate = 0;
      this.flagEpisode = 0;
    }

    if (this.flagName == 3) {
      this.episodes = this.episodes.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.flagName = 0;
    }
  }

  sortByAir() {
    if (this.flagAirDate == 1) {
      this.episodes = this.episodes.sort((a, b) =>
        a.air_date > b.air_date ? -1 : 1
      );
      this.flagAirDate++;
      this.flagId = 0;
      this.flagName = 0;
      this.flagEpisode = 0;
    } else {
      this.episodes = this.episodes.sort((a, b) =>
        a.air_date > b.air_date ? 1 : -1
      );
      this.flagAirDate++;
      this.flagId = 0;
      this.flagName = 0;
      this.flagEpisode = 0;
    }

    if (this.flagAirDate == 3) {
      this.episodes = this.episodes.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.flagAirDate = 0;
    }
  }

  sortByEpisode() {
    if (this.flagEpisode == 1) {
      this.episodes = this.episodes.sort((a, b) =>
        a.episode > b.episode ? -1 : 1
      );
      this.flagEpisode++;
      this.flagId = 0;
      this.flagName = 0;
      this.flagAirDate = 0;
    } else {
      this.episodes = this.episodes.sort((a, b) =>
        a.episode > b.episode ? 1 : -1
      );
      this.flagEpisode++;
      this.flagId = 0;
      this.flagName = 0;
      this.flagAirDate = 0;
    }

    if (this.flagEpisode == 3) {
      this.episodes = this.episodes.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.flagEpisode = 0;
    }
  }
}
