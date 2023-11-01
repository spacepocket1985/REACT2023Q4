import { useState, useEffect } from 'react';

import { IAppState } from '../interfaces/IAppState';
import { RickAndMortyAPI } from '../services/RickAndMortyAPI';
import { IRickAndMortyData } from '../interfaces/IRickAndMortyData';
import { getUserQuery } from '../utils/localStorageActions';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Spinner from '../components/Spinner/Spinner';
import SearchForm from '../components/SearchForm/SearchForm';
import CharacterList from '../components/CharactersList/CharactersList';
import CharacterInfo from '../components/CharacterInfo/CharacterInfo';

const MainPage = () => {
  const RickAndMortyService = new RickAndMortyAPI();

  const [appData, setAppData] = useState<IAppState>({
    charactersList: [],
    nextPage: null,
    previousPage: null,
    error: false,
    errorMsg: '',
    loading: false,
    query: RickAndMortyService._queryBase,
  });

  const [selectedChar, setChar] = useState<null | number>(null);

  useEffect(() => {
    let query = getUserQuery();
    if (query === null) query = RickAndMortyService._queryBase;

    onRequest(RickAndMortyService._apiBase, query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRequest = (link?: string, query?: string): void => {
    setAppData({ ...appData, loading: true });
    RickAndMortyService.getResource(link, query).then(onPersonListLoaded).catch(onError);
  };

  const onPersonListLoaded = (RickAndMortyData: IRickAndMortyData): void => {
    setAppData({
      ...appData,
      charactersList: RickAndMortyData.results.map((char) => char),
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
      query: RickAndMortyService._queryBase,
      errorMsg: error.message,
    });
  };

  const onClickPaginationButton = (url: string | null): void => {
    url && onRequest(url);
    onCloseCharInfo();
  };

  const onSearchSubmit = (query: string, error?: boolean): void => {
    setAppData({ ...appData, query });

    onRequest(RickAndMortyService._apiBase, query);
    if (error) setAppData({ ...appData, error });
  };

  const onCharSelected = (id: number) => {
    setChar(id);
  };

  const onCloseCharInfo = () => {
    setChar(null);
  };

  const { charactersList, nextPage, previousPage, loading, error, errorMsg } = appData;

  const isCharSelected = selectedChar ? 'with-info' : 'without-info';
  const errorMessage = error ? <ErrorMessage errorMsg={errorMsg} /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? (
    <CharacterList
      charactersList={charactersList}
      nextPage={nextPage}
      previousPage={previousPage}
      onClickPaginationButton={onClickPaginationButton}
      onCharSelected={onCharSelected}
    />
  ) : null;

  return (
    <>
      <main className={isCharSelected}>
        <SearchForm onSearchSubmit={onSearchSubmit} buttonStatus={loading} hasError={error} />
        {errorMessage}
        {spinner}
        {content}
      </main>
      <CharacterInfo charId={selectedChar} onCloseCharInfo={onCloseCharInfo} />
    </>
  );
};

export default MainPage;
