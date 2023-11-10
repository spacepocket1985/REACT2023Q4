import { Link, useParams } from 'react-router-dom';
import { useContext } from 'react';

import CharacterCard from '../CharacterCard/CharacterCard';
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
          <CharacterCard name={name} image={image} />
        </Link>
      );
    });

  return (
    <div className="characters__wrapper">
      {appData.charactersList && appData.charactersList?.length > 0 ? (
        renderCharacters(appData.charactersList)
      ) : (
        <h3>No characters</h3>
      )}
    </div>
  );
};

export default CharactersList;
