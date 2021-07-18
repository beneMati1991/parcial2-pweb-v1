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

  getCharacters(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  getCharactersPaginado(id:number): Observable<Character> {
    return this.http.get<Character>(this.baseUrl + '?page='+id);
  }

  getBuscarCapitulos( campo:string ){
    return this.http.get(this.baseUrl + `/?name=${ campo }`);
  }
}
