import { Component } from 'react';
import { RickAndMortyAPI } from './services/RickAndMortyAPI';
import { IRickAndMortyData } from './interfaces/IRickAndMortyData';
import { IAppState } from './interfaces/IAppState';
import Spinner from './components/Spinner/Spinner';
import SearchForm from './components/SearchForm/SearchForm';
import CharacterList from './components/CharactersList/CharactersList';

import './App.css';

class App extends Component {
  state: IAppState = {
    charactersList: [],
    nextPage: null,
    previousPage: null,
    loading: true,
    error: false,
    query: '',
  };

  RickAndMortyService = new RickAndMortyAPI();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (link?: string): void => {
    this.setState({ loading: true });
    this.RickAndMortyService.getResource(link, this.state.query).then(this.onPersonListLoaded);
  };

  onPersonListLoaded = (RickAndMortyData: IRickAndMortyData): void => {
    this.setState({
      charactersList: RickAndMortyData.results.map((char) => char),
      nextPage: RickAndMortyData.info.next,
      previousPage: RickAndMortyData.info.prev,
      loading: false,
    });
  };

  onClickPaginationButton = (url: string | null): void => {
    url && this.onRequest(url);
  };

  onSearch = (query: string): void => {
    this.setState({ query });
  };

  onSearchSubmit = (): void => {
    this.onRequest();
  };

  render() {
    const { charactersList, nextPage, previousPage, loading } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? (
      <CharacterList
        charactersList={charactersList}
        nextPage={nextPage}
        previousPage={previousPage}
        onClickPaginationButton={this.onClickPaginationButton}
      />
    ) : null;

    return (
      <>
        <header>
          <SearchForm onSearch={this.onSearch} onSearchSubmit={this.onSearchSubmit} />
        </header>
        <main>
          {spinner}
          {content}
        </main>
      </>
    );
  }
}

export default App;
