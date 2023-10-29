import { ICharacter } from './ICharacter';

export interface IRickAndMortyData {
  info: {
    count: number;
    next: string | null;
    prev: string | null;
    pages: number;
  };
  results: ICharacter[];
}
