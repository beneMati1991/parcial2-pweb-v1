import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CharacterObject } from 'src/app/models/character';
import { CharactersService } from '../../services/characters.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  public characters: CharacterObject[] = [];

  constructor(
    public auth: AuthService,
    private charactersService: CharactersService
  ) {
    this.getAllCharacters();
  }

  ngOnInit(): void {}

  getAllCharacters() {
    this.charactersService.getCharacters().subscribe(
      (data) => {
        this.characters = data.results;
        this.characters.forEach((element) => {
          this.getImage(element.id);
        });
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }

  getImage(id: number) {
    this.charactersService.getCharacterImage(id).subscribe(
      (data) => {
        this.createImageFromBlob(data);
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }

  public imageToShow: any[] = [];

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow.push(reader.result);
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
