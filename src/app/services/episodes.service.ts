import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Episode } from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) { }

  getEpisodes():Observable<any>{
    return this.http.get("https://rickandmortyapi.com/api/episode");
  }

  getEpisodesXPagina(id: number):Observable<Episode>{
    return this.http.get<Episode>("https://rickandmortyapi.com/api/episode?page=" + id);
  }

  getBuscarEpisodios( campo:string ){
    return this.http.get(`https://rickandmortyapi.com/api/episode/?name=${ campo }`);
  }
}
