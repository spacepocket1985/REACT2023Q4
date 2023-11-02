import { Link } from 'react-router-dom';

import { ICharacter } from '../../interfaces/ICharacter';
import { ICharactersListProps } from '../../interfaces/ICharactersListProps';
import './CharactersList.css';

const CharactersList = (props: ICharactersListProps) => {
  const { charactersList, onCharSelected } = props;

  const renderCharacters = (characters: ICharacter[]) =>
    characters.map((char, index) => {
      const { name, image, id } = char;
      return (
        <Link key={index} to={`/character/${id}`}>
          <div
            className="character-card__wrapper"
            onClick={() => {
              onCharSelected(id);
            }}
          >
            <div className="card-img__wrapper">
              <img className="card-img" src={image} alt={name} />
            </div>
            <div className="card-content__wrapper">
              <div className="card-content__name">{name}</div>
            </div>
          </div>
        </Link>
      );
    });

  return <div className="characters__wrapper">{renderCharacters(charactersList)}</div>;
};

export default CharactersList;
