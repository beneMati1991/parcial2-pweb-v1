import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharactersService {
  constructor(private http: HttpClient) {}

  getCharacters(): Observable<any> {
    return this.http.get('https://rickandmortyapi.com/api/character');
  }

  getCharacterImage(id: number){
    let url = 'https://rickandmortyapi.com/api/character/avatar/'+id+'.jpeg';
    return this.http.get(url, { responseType: 'blob' });
  }
}
