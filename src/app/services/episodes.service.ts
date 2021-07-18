import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObject } from '../models/episode';

@Injectable({
  providedIn: 'root'
})
export class EpisodesService {

  constructor(private http: HttpClient) { }

  getEpisodes():Observable<any>{
    return this.http.get("https://rickandmortyapi.com/api/episode");
  }

  getEpisodesXPagina(id: number):Observable<RootObject>{
    return this.http.get<RootObject>("https://rickandmortyapi.com/api/episode?page=" + id);
  }

  getBuscarEpisodios( campo:string ){
    return this.http.get(`https://rickandmortyapi.com/api/episode/?name=${ campo }`);
  }
}
