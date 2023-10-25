import { IPerson } from './IPerson';

export interface IPersonsListProps {
  personsList: IPerson[];
  nextPage: null | string;
  previousPage: null | string;
  onClickPaginationButton: (url: string | null) => void;
}
