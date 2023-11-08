import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { ICharacter } from '../../types/interfaces/ICharacter';

import './CharactersList.css';

const CharactersList = () => {
  const { pageNum } = useParams();
  const { appData } = useContext(AppContext);

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

  return <div className="characters__wrapper">{renderCharacters(appData.charactersList)}</div>;
};

export default CharactersList;
