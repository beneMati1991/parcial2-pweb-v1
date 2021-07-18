import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CharacterObject } from 'src/app/models/character';
import { CharactersService } from '../../services/characters.service';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  public characters: Array<CharacterObject> = [];
  public imageToShow: any[] = [];
  modalRef: MDBModalRef;
  public page = 1;
  public pageSize = 6;
  public pagesJSON: number;

  //Order
  private flagId = 0;
  private flagName = 0;
  private flagGenero = 0;

  constructor(
    public auth: AuthService,
    private charactersService: CharactersService,
    private dialog: MatDialog
  ) {
    this.getAllCharacters();
  }

  ngOnInit(): void {}

  /*Función utilizada para enviar y mostrar modal con el personaje clickeado.*/
  openModal(id: number) {
    let character: any = this.getCharacterData(id);
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.data = {
      name: character.name,
      gender: character.gender,
      species: character.species,
      image: character.image,
    };

    const dialog = this.dialog.open(ModalComponent, dialogConfig);
  }

  /** Función utilizada para buscar información a informar en el modal. */
  getCharacterData(id: number) {
    let obj: any;
    this.characters.forEach((element) => {
      if (element.id == id) {
        obj = new Aux(element);
      }
    });
    return obj.objNew;
  }

  //Obtiene todos los personajes.
  getAllCharacters() {
    this.charactersService.getCharacters().subscribe(
      (data) => {
        this.pagesJSON = data.info.pages;
        
        for (let i = 1; i <= this.pagesJSON; i++) {
          //Obtengo todas las paginaciones del servicio.
          this.getAllCharactersPaginado(i);
        }
        this.characters  = this.characters.sort()
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }

  getAllCharactersPaginado(id: number){
    this.charactersService.getCharactersPaginado(id).subscribe(
      (data: Character) => {
        this.characters = this.characters.concat(data.results);
      },
      (err) => {
        console.log('Se produjo error: ' + err);
      }
    );
  }

  buscarPersonaje(campo: string) {
    this.charactersService.getBuscarCapitulos(campo).subscribe(
      (data: any) => {
        this.characters = data.results;
        this.flagId = 0;
        this.flagName = 0;
        this.flagGenero = 0;
      },
      (err) => {
        this.characters = []
      }
    );
  }


  sortById() {
    if (this.flagId == 1) {
      this.characters = this.characters.sort((a, b) => (a.id > b.id ? -1 : 1));
      this.flagId ++;
      this.flagName = 0;
      this.flagGenero = 0;
    } else {
      this.characters = this.characters.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.flagId ++;
      this.flagName = 0;
      this.flagGenero = 0;
    }

    if(this.flagId == 3)
    {
      this.flagId = 0;
    }
  }

  sortByName() {
    if (this.flagName == 1) {
      this.characters = this.characters.sort((a, b) => (a.name > b.name ? -1 : 1));
      this.flagName ++;
      this.flagId = 0;
      this.flagGenero = 0;
    } else {
      this.characters = this.characters.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.flagName ++;
      this.flagId = 0;
      this.flagGenero = 0;
    }

    if(this.flagName == 3)
    {
      this.characters = this.characters.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.flagName = 0;
    }
  }


  sortByGenero() {
    if (this.flagGenero == 1) {
      this.characters = this.characters.sort((a, b) => (a.gender > b.gender ? -1 : 1));
      this.flagGenero ++;
      this.flagId = 0;
      this.flagName = 0;
    } else {
      this.characters = this.characters.sort((a, b) => (a.gender > b.gender ? 1 : -1));
      this.flagGenero ++;
      this.flagId = 0;
      this.flagName = 0;
    }

    if(this.flagGenero == 3)
    {
      this.characters = this.characters.sort((a, b) => (a.id > b.id ? 1 : -1));
      this.flagGenero = 0;
    }
  }



}

//clase creada para que cree un objeto al mostrar info, no siempre el mismo.
class Aux {
  objNew: CharacterObject;

  constructor(objRecieve: CharacterObject) {
    this.objNew = objRecieve;
  }
}
