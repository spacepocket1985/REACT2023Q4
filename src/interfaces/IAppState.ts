import { ICharacter } from './ICharacter';

export interface IAppState {
  charactersList: ICharacter[];
  nextPage: null | string;
  previousPage: null | string;
  loading: boolean;
  query: string;
  error: boolean;
  errorMsg: null | string;
  showCharInfo: boolean;
}
