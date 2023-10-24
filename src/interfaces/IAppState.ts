import { IPerson } from '../services/SwapiDev';

export interface IAppState {
  personsList: IPerson[];
  loading: boolean;
  error: boolean;
}
