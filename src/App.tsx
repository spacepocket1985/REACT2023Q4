import { Component } from 'react';

import { RickAndMortyAPI } from './services/RickAndMortyAPI';
import { IRickAndMortyData } from './interfaces/IRickAndMortyData';
import { IAppState } from './interfaces/IAppState';
import { getUserQuery } from './utils/localStorageActions';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import Spinner from './components/Spinner/Spinner';
import SearchForm from './components/SearchForm/SearchForm';
import CharacterList from './components/CharactersList/CharactersList';

import './App.css';

class App extends Component<object, IAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      charactersList: [],
      nextPage: null,
      previousPage: null,
      loading: true,
      error: false,
      errorMsg: null,
      query: this.RickAndMortyService._queryBase,
    };
  }

  RickAndMortyService = new RickAndMortyAPI();

  componentDidMount() {
    let query = getUserQuery();
    if (query === null) query = this.RickAndMortyService._queryBase;

    this.onRequest(this.RickAndMortyService._apiBase, query);
  }

  onRequest = (link?: string, query?: string): void => {
    this.setState({ loading: true });
    this.RickAndMortyService.getResource(link, query)
      .then(this.onPersonListLoaded)
      .catch(this.onError);
  };

  onPersonListLoaded = (RickAndMortyData: IRickAndMortyData): void => {
    this.setState({
      charactersList: RickAndMortyData.results.map((char) => char),
      nextPage: RickAndMortyData.info.next,
      previousPage: RickAndMortyData.info.prev,
      loading: false,
      error: false,
    });
  };

  onError = (error: Error) => {
    this.setState({
      loading: false,
      error: true,
      query: this.RickAndMortyService._queryBase,
      errorMsg: error.message,
    });
  };

  onClickPaginationButton = (url: string | null): void => {
    url && this.onRequest(url);
  };

  onSearchSubmit = (query: string, error?: boolean): void => {
    this.setState({ query });
    this.onRequest(this.RickAndMortyService._apiBase, query);
    console.log('er==>', error);
    if (error) this.setState({ error });
  };

  render() {
    const { charactersList, nextPage, previousPage, loading, error, errorMsg } = this.state;

    const errorMessage = error ? <ErrorMessage errorMsg={errorMsg} /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <CharacterList
        charactersList={charactersList}
        nextPage={nextPage}
        previousPage={previousPage}
        onClickPaginationButton={this.onClickPaginationButton}
      />
    ) : null;

    return (
      <ErrorBoundary>
        <SearchForm onSearchSubmit={this.onSearchSubmit} buttonStatus={loading} hasError={error} />
        <main>
          {errorMessage}
          {spinner}
          {content}
        </main>
      </ErrorBoundary>
    );
  }
}

export default App;
