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

  constructor(
    public auth: AuthService,
    private episodesService: EpisodesService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEpisodes();
  }

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
    if (campo == '') {
      this.episodes = [];
      this.ngOnInit();
    } else {
      this.episodes = this.episodes.filter((res) => {
        return res.name.toLocaleLowerCase().match(campo.toLocaleLowerCase());
      });
    }
  }

  buscarId(campo: string) {
    if (campo == '') {
      this.episodes = [];
      this.ngOnInit();
    } else {
      this.episodes = this.episodes.filter((res) => {
        return res.id.toString().includes(campo);
      });
    }
  }

  key: string = 'id';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}
