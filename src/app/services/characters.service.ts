import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {

  baseUrl = environment.characterUrl;

  constructor(private http: HttpClient) {}

  getCharacters(campo: string): Observable<any> {
    //return this.http.get(this.baseUrl);
    return this.http.get(this.baseUrl + `/?name=${ campo }`);
  }

  getCharactersPaginado(campo:string, id:number): Observable<Character> {
    //return this.http.get<Character>(this.baseUrl + '?page='+id);
    return this.http.get<Character>(this.baseUrl + `/?name=${ campo }&page=${id}`);
  }

  getBuscarCapituloXId( id:string ){
    return this.http.get(this.baseUrl + `/${id}`);
  }
}
