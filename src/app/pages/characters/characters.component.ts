import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CharacterObject } from 'src/app/models/character';
import { CharactersService } from '../../services/characters.service';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Character } from '../../models/character';
import { ToastrService } from 'ngx-toastr';
import { characterModal } from 'src/app/classes/characterAuxiliar';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css'],
})
export class CharactersComponent implements OnInit {
  //#region Variables
  public characters: Array<CharacterObject> = [];
  public imageToShow: any[] = [];
  modalRef: MDBModalRef;
  public page = 1;
  public pageSize = 6;
  public pagesJSON: number;
  //#endregion

  constructor(
    public auth: AuthService,
    private charactersService: CharactersService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.getAllCharacters('');
  }

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
        obj = new characterModal(element);
      }
    });
    return obj.objNew;
  }

  //Obtiene todos los personajes.
  getAllCharacters(campo: string) {
    this.characters = [];
    this.charactersService.getCharacters(campo).subscribe(
      (data) => {
        this.pagesJSON = data.info.pages;

        for (let i = 1; i <= this.pagesJSON; i++) {
          //Obtengo todas las paginaciones del servicio.
          this.getAllCharactersPaginado(campo, i);
        }
        this.characters = this.characters.sort();
      },
      (err) => {
        //console.log('Se produjo error: ' + err);
        this.toastr.error(err.status + ' ' + err.name, 'Ocurrio un error.');
      }
    );
  }

  getAllCharactersPaginado(campo: string, id: number) {
    this.charactersService.getCharactersPaginado(campo, id).subscribe(
      (data: Character) => {
        this.characters = this.characters.concat(data.results);
      },
      (err) => {
        //console.log('Se produjo error: ' + err);
        this.toastr.error(err.status + ' ' + err.name, 'Ocurrio un error.');
      }
    );
  }

  getCharacterId(campo: string) {
    if (campo == '') {
      this.ngOnInit();
    } else {
      this.charactersService.getBuscarCapituloXId(campo).subscribe(
        (data: CharacterObject) => {
          let aux: Array<CharacterObject> = [];
          aux.push(data);
          this.characters = aux;
        },
        (err) => {
          //console.log('Se produjo error: ' + err);
          this.toastr.error('No existe ID');
        }
      );
    }
  }

  key: string = 'id';
  reverse: boolean = false;

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }
}