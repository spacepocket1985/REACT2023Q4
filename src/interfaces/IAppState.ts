import { ICharacter } from './ICharacter';

export interface IAppState {
  charactersList: ICharacter[];
  nextPage: null | string;
  previousPage: null | string;
  loading: boolean;
  error: boolean;
  query: string;
}
