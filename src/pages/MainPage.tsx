import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';

import { IAppState } from '../interfaces/IAppState';
import RickAndMortyAPI from '../services/RickAndMortyAPI';
import { IRickAndMortyData } from '../interfaces/IRickAndMortyData';
import { getUserQuery } from '../utils/localStorageActions';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Spinner from '../components/Spinner/Spinner';
import SearchForm from '../components/SearchForm/SearchForm';
import Pagination from '../components/Pagination/Pagination';
import CharacterList from '../components/CharactersList/CharactersList';
import CharacterInfo from '../components/CharacterInfo/CharacterInfo';

const MainPage = () => {
  const { getResource, _apiBase, _queryBase } = RickAndMortyAPI();
  const navigate = useNavigate();
  const { characterId } = useParams();

  const [appData, setAppData] = useState<IAppState>({
    charactersList: [],
    nextPage: null,
    previousPage: null,
    error: false,
    errorMsg: '',
    loading: false,
    query: _queryBase,
    charactersOnPage: 20,
  });

  useEffect(() => {
    let query = getUserQuery();
    if (query === null) query = _queryBase;

    onRequest(_apiBase, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData.charactersOnPage, appData.query]);

  const onRequest = (link?: string, query?: string): void => {
    setAppData({ ...appData, loading: true, error: false });
    getResource(link, query).then(onPersonListLoaded).catch(onError);
  };

  const onPersonListLoaded = (RickAndMortyData: IRickAndMortyData): void => {
    setAppData({
      ...appData,
      charactersList: RickAndMortyData.results.slice(0, appData.charactersOnPage),
      nextPage: RickAndMortyData.info.next,
      previousPage: RickAndMortyData.info.prev,
      loading: false,
      error: false,
    });
  };

  const onError = (error: Error) => {
    setAppData({
      ...appData,
      loading: false,
      error: true,
      query: _queryBase,
      errorMsg: error.message,
    });
  };

  const onClickPaginationButton = (url: string | null): void => {
    url && onRequest(url);
  };

  const onSearchSubmit = (query: string, error?: boolean): void => {
    setAppData({ ...appData, query, error: false });

    if (error) setAppData({ ...appData, error });
  };

  const onQuantitySelection = (charactersOnPage: number) => {
    setAppData({ ...appData, charactersOnPage });
  };

  const check = (event: React.MouseEvent) => {
    if (event.target instanceof HTMLElement) {
      const el = event.target;
      if (!el.closest('.character-card__wrapper') && characterId) {
        console.log(!el.closest('.character-card__wrapper') && characterId);
        navigate('/');
      }
    }
  };

  const { charactersList, nextPage, previousPage, loading, error, errorMsg } = appData;

  const isCharSelected = characterId ? 'with-info' : 'without-info';
  const errorMessage = error ? <ErrorMessage errorMsg={errorMsg} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {charactersList && (nextPage || previousPage) ? (
        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          onClickPaginationButton={onClickPaginationButton}
          onQuantitySelection={onQuantitySelection}
          defoultQuantity={appData.charactersOnPage}
        />
      ) : null}
      <CharacterList charactersList={charactersList} />
    </>
  ) : null;

  return (
    <>
      <main className={isCharSelected} onClick={check}>
        <SearchForm onSearchSubmit={onSearchSubmit} buttonStatus={loading} hasError={error} />
        {errorMessage}
        {spinner}
        {content}
      </main>
      <CharacterInfo characterId={Number(characterId)} />
      <Outlet />
    </>
  );
};

export default MainPage;
