import { Origin } from './origin';
import { Location } from './location';


export interface Info {
  count: number;
  pages: number;
  next: string;
  prev?: any;
}

export interface CharacterObject {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export interface Character {
  info: Info;
  results: CharacterObject[];
}
