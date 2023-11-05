import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Outlet } from 'react-router-dom';

import ROUTE_PARTH from '../types/enums/routes-parths';
import { IAppState } from '../types/interfaces/IAppState';
import { IRickAndMortyData } from '../types/interfaces/IRickAndMortyData';
import { getUserQuery } from '../utils/localStorageActions';
import RickAndMortyAPI from '../services/RickAndMortyAPI';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Spinner from '../components/Spinner/Spinner';
import SearchForm from '../components/SearchForm/SearchForm';
import Pagination from '../components/Pagination/Pagination';
import CharacterList from '../components/CharactersList/CharactersList';
import CharacterInfo from '../components/CharacterInfo/CharacterInfo';

const MainPage = () => {
  const { getResource, _apiBase, _queryBase } = RickAndMortyAPI();

  const { characterId, pageNum, queryParam } = useParams();

  const navigate = useNavigate();

  const [appData, setAppData] = useState<IAppState>({
    charactersList: [],
    nextPage: null,
    previousPage: null,
    error: false,
    errorMsg: '',
    loading: false,
    query: _queryBase,
    charactersOnPage: 20,
    currentPage: 1,
  });

  useEffect(() => {
    let query = getUserQuery();
    if (query === null) query = _queryBase;

    let url = _apiBase;

    if (pageNum) url = `${_apiBase}?page=${Number(pageNum)}`;
    if (queryParam) url = `${_apiBase}?name=${queryParam}`;
    if (characterId) return;

    onRequest(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appData.charactersOnPage, pageNum, queryParam]);

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
      currentPage: Number(pageNum),
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

  const onQuantitySelection = (charactersOnPage: number) => {
    setAppData({ ...appData, charactersOnPage });
    navigate(ROUTE_PARTH.MAIN);
  };

  const { charactersList, nextPage, currentPage, previousPage, loading, error, errorMsg } = appData;

  const isCharSelected = characterId ? 'with-info' : 'without-info';
  const errorMessage = error ? <ErrorMessage errorMsg={errorMsg} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {charactersList && (nextPage || previousPage) ? (
        <Pagination
          nextPage={nextPage}
          previousPage={previousPage}
          onQuantitySelection={onQuantitySelection}
          defoultQuantity={appData.charactersOnPage}
          currentPage={currentPage}
        />
      ) : null}
      <CharacterList charactersList={charactersList} />
    </>
  ) : null;

  return (
    <>
      <main className={isCharSelected}>
        <SearchForm buttonStatus={loading} hasError={error} />
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
