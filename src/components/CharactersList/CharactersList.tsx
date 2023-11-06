import { Link, useParams } from 'react-router-dom';

import { ICharacter } from '../../types/interfaces/ICharacter';
import { ICharactersListProps } from '../../types/interfaces/ICharactersListProps';
import './CharactersList.css';

const CharactersList = (props: ICharactersListProps) => {
  const { charactersList } = props;
  const { pageNum } = useParams();

  const page = !pageNum ? 1 : pageNum;

  const renderCharacters = (characters: ICharacter[]) =>
    characters.map((char, index) => {
      const { name, image, id } = char;
      return (
        <Link key={index} to={`/page=${page}/characterId=${id}`}>
          <div className="character-card__wrapper">
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
