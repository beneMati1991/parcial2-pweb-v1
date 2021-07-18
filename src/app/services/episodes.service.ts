import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  baseUrl = environment.episodeUrl;

  constructor(private http: HttpClient) { }

  getEpisodes():Observable<any>{
    return this.http.get(this.baseUrl);
  }

  getEpisodesXPagina(id: number):Observable<Episode>{
    return this.http.get<Episode>(this.baseUrl + "?page=" + id);
  }

  getBuscarEpisodios( campo:string ){
    return this.http.get(this.baseUrl + `/?name=${ campo }`);
  }
}
