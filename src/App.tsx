import { Component } from 'react';
import { SwapiDevService } from './services/SwapiDev';
import { ISwapiData } from './interfaces/ISwapiData';
import { IAppState } from './interfaces/IAppState';
import SearchForm from './components/SearchForm/SearchForm';
import PersonsList from './components/PersonsList/PersonsList';

import './App.css';

class App extends Component {
  state: IAppState = {
    personsList: [],
    nextPage: null,
    previousPage: null,
    loading: true,
    error: false,
    query: '',
  };

  SwapiDevService = new SwapiDevService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (link?: string): void => {
    this.SwapiDevService.getResource(link, this.state.query).then(this.onPersonListLoaded);
  };

  onPersonListLoaded = (swapiData: ISwapiData): void => {
    this.setState({
      personsList: swapiData.results.map((item) => item),
      nextPage: swapiData.next,
      previousPage: swapiData.previous,
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
    const { personsList, nextPage, previousPage } = this.state;
    return (
      <>
        <header>
          <SearchForm onSearch={this.onSearch} onSearchSubmit={this.onSearchSubmit} />
        </header>
        <main>
          <PersonsList
            personsList={personsList}
            nextPage={nextPage}
            previousPage={previousPage}
            onClickPaginationButton={this.onClickPaginationButton}
          />
        </main>
      </>
    );
  }
}

export default App;
