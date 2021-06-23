import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RootObject } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }

  getCharactersPaginado(id:number): Observable<RootObject> {
    return this.http.get<RootObject>('https://rickandmortyapi.com/api/character?page='+id);
  }
}
