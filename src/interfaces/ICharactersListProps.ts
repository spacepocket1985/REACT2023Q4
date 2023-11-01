import { ICharacter } from './ICharacter';

export interface ICharactersListProps {
  charactersList: ICharacter[];
  onCharSelected: (id: number) => void;
}
