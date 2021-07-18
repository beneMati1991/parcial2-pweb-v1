import { CharacterObject } from "../models/character";

//clase creada para que cree un objeto al mostrar info, no siempre el mismo.
export class characterModal {
    objNew: CharacterObject;
  
    constructor(objRecieve: CharacterObject) {
      this.objNew = objRecieve;
    }
  }
  