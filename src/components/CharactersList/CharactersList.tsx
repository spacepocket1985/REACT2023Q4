import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { RootState } from '../../store/store';
import Pagination from '../Pagination/Pagination';
import { useGetCharactersQuery } from '../../store/slices/apiSlice';
import { setLoadingMain } from '../../store/slices/loadingMainSlice';
import CharacterCard from '../CharacterCard/CharacterCard';
import Spinner from '../Spinner/Spinner';
import { ICharacter } from '../../types/interfaces/ICharacter';

const CharactersList = () => {
  const dispatch = useDispatch();
  const charsOnPage = useSelector((state: RootState) => {
    return state.charactersOnPage.charactersOnPage;
  });

  const router = useRouter();

  // Get the query parameter from the URL
  const { pageNum, characterId, queryParam } = router.query;

  const page = !pageNum ? 1 : Number(pageNum);

  const { data, isLoading, isError, isFetching } = useGetCharactersQuery(
    characterId && pageNum
      ? `/?page=${page}`
      : (characterId && queryParam) || (!characterId && queryParam)
      ? `?name=${queryParam}`
      : `/?page=${page}`
  );

  useEffect(() => {
    dispatch(setLoadingMain(isFetching));
  }, [dispatch, isFetching]);

  const renderCharacters = (characters: ICharacter[]) =>
    characters.map((char, index) => {
      const { name, image, id } = char;
      return <CharacterCard name={name} image={image} id={id} page={page} key={index} />;
    });

  if (isLoading) {
    return <Spinner />;
  } else if (isError) {
    return <h2>Loading error</h2>;
  }

  return (
    <>
      {data ? <Pagination nextPage={data.info.next} prevPage={data.info.prev} /> : null}
      <div className="characters__wrapper">
        {data?.results && data.results?.length > 0 ? (
          renderCharacters(data.results.slice(0, charsOnPage))
        ) : (
          <h3>No characters</h3>
        )}
      </div>
    </>
  );
};

export default CharactersList;
