import { IPerson } from './IPerson';

export interface ISwapiData {
  count: number;
  next: string | null;
  previous: string | null;
  results: IPerson[];
}
