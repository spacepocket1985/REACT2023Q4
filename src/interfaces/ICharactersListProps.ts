import { ICharacter } from './ICharacter';

export interface ICharactersListProps {
  charactersList: ICharacter[];
  nextPage: null | string;
  previousPage: null | string;
  onClickPaginationButton: (url: string | null) => void;
  onCharSelected: (id: number) => void;
}
