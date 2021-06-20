import { Inject } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  name: string;
  gender: string;
  species: string;
  image: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) datosRecibidos: any,
    private dialogRef: MatDialogRef<ModalComponent>
  ) {
    this.name = datosRecibidos.name;
    this.gender = datosRecibidos.gender;
    this.species = datosRecibidos.species;
    this.image = datosRecibidos.image;
  }

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }
}
