import { IPerson } from './IPerson';

export interface IAppState {
  personsList: IPerson[];
  nextPage: null | string;
  previousPage: null | string;
  loading: boolean;
  error: boolean;
}
