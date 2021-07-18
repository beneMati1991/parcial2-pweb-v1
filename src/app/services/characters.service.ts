import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }

  getCharactersPaginado(id:number): Observable<Character> {
    return this.http.get<Character>('https://rickandmortyapi.com/api/character?page='+id);
  }

  getBuscarCapitulos( campo:string ){
    return this.http.get(`https://rickandmortyapi.com/api/character/?name=${ campo }`);
  }
}
