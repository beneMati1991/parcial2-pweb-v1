import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AuthModule } from '@auth0/auth0-angular';

import { CharactersComponent } from './characters.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

describe('CharactersComponent', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CharactersComponent],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        AuthModule.forRoot({
          domain: 'dev-f5z9j2wu.us.auth0.com',
          clientId: '82o1FfwPFSxvbaCxVlIuXzcUoogmuzlo',
        }),
        MatDialogModule,
        ToastrModule.forRoot({
          timeOut: 1000,
          progressBar: true,
          progressAnimation: 'increasing',
          preventDuplicates: true
        })
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('existe método getAllCharacters', () => {
    expect(component.getAllCharacters).toBeDefined();
  });

  it('existe método openModal', () => {
    expect(component.openModal).toBeDefined();
  });

  it('existe método getCharacterData', () => {
    expect(component.getCharacterData).toBeDefined();
  });

  it('lista inicia con ningun valor', () => {
    expect(component.characters.length).toBe(0);
  });

  // it('se carga valores en lista', () => {
  //   component.getAllCharacters('a');
  //   const listaCharacter = component.characters;
  //   expect(listaCharacter).length > 0;
  // });
});
