import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CharacterObject } from 'src/app/models/character';
import { CharactersService } from '../../services/characters.service';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  public characters: CharacterObject[] = [];
  public imageToShow: any[] = [];
  modalRef: MDBModalRef;
  public page = 1;
  public pageSize = 4;

  constructor(
    public auth: AuthService,
    private charactersService: CharactersService,
    private dialog: MatDialog
  ) {
    this.getAllCharacters();
  }

  ngOnInit(): void {}

  openModal(id: number, index: number) {
    let character: any = this.getCharacterData(id);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = {
      name: character.name,
      gender: character.gender,
      species: character.species,
      image: this.imageToShow[index],
    };

    const dialog = this.dialog.open(ModalComponent, dialogConfig);
  }

  getCharacterData(id: number) {
    let obj: any;
    this.characters.forEach((element) => {
      if (element.id == id) {
        obj = new Aux(element);
      }
    });
    return obj.objNew;
  }

  getAllCharacters() {
    this.charactersService.getCharacters().subscribe(
      (data) => {
        //console.log(data.results)
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

class Aux {
  objNew: CharacterObject;

  constructor(objRecieve: CharacterObject) {
    this.objNew = objRecieve;
  }
}
