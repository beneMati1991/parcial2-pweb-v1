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
  private characters: CharacterObject;

  constructor(
    public auth: AuthService,
    private charactersService: CharactersService
  ) {
    this.getAllCharacters();
    this.getImage();
  }

  ngOnInit(): void {}

  getAllCharacters() {
    this.charactersService.getCharacters().subscribe(
      (data) => {
        this.characters = data.results;
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }

  getImage() {
    this.charactersService.getCharacterImage(2).subscribe(
      (data) => {
        this.createImageFromBlob(data);
        console.log(data);
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }

  imageToShow: any;

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.imageToShow = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
