import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../store/store';
import { useGetCharactersQuery } from '../../store/slices/apiSlice';
import { setLoadingMain } from '../../store/slices/loadingMainSlice';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import { ICharacter } from '../../types/interfaces/ICharacter';

import './CharactersList.css';

const CharactersList = () => {
  const dispatch = useDispatch();
  const charsOnPage = useSelector((state: RootState) => {
    return state.charactersOnPage.charactersOnPage;
  });

  const { pageNum, characterId, queryParam } = useParams();
  console.log('pageNum = ', pageNum);
  console.log('characterId = ', characterId);
  console.log('queryParam = ', queryParam);
  console.log('-----------------------------------');
  const page = !pageNum ? 1 : pageNum;

  const { data, isLoading, isError } = useGetCharactersQuery(
    characterId && pageNum
      ? `/?page=${pageNum}`
      : (characterId && queryParam) || (!characterId && queryParam)
      ? `?name=${queryParam}`
      : `/?page=${pageNum}`
  );

  const renderCharacters = (characters: ICharacter[]) =>
    characters.map((char, index) => {
      const { name, image, id } = char;
      return <CharacterCard name={name} image={image} id={id} page={page} key={index} />;
    });

  isLoading ? dispatch(setLoadingMain(isLoading)) : dispatch(setLoadingMain(false));

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h2>Loading error</h2>;
  }

  return (
    <div className="characters__wrapper">
      {data?.results && data.results?.length > 0 ? (
        renderCharacters(data.results.slice(0, charsOnPage))
      ) : (
        <h3>No characters</h3>
      )}
    </div>
  );
};

export default CharactersList;
