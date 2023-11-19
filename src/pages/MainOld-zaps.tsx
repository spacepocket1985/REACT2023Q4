import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Outlet } from 'react-router-dom';

import { IAppState } from '../types/interfaces/IAppState';
import { IRickAndMortyData } from '../types/interfaces/IRickAndMortyData';
import { getUserQuery } from '../utils/localStorageActions';
import AppContext from '../context/AppContext';
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

  const [appData, setAppData] = useState<IAppState>({
    charactersList: [],
    nextPage: null,
    previousPage: null,
    error: false,
    errorMsg: '',
    loading: false,
    query: getUserQuery() || '',
    charactersOnPage: 20,
    currentPage: 1,
  });

  useEffect(() => {
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

  const { charactersList, nextPage, previousPage, loading, error, errorMsg } = appData;

  const isCharSelected = characterId ? 'with-info' : 'without-info';
  const errorMessage = error ? <ErrorMessage errorMsg={errorMsg} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <>
      {charactersList && (nextPage || previousPage) ? <Pagination /> : null}
      <CharacterList />
    </>
  ) : null;

  return (
    <AppContext.Provider value={{ appData: appData, setAppData: setAppData }}>
      <main className={isCharSelected}>
        <SearchForm />
        {errorMessage}
        {spinner}
        {content}
      </main>
      <CharacterInfo />
      <Outlet />
    </AppContext.Provider>
  );
};

export default MainPage;
