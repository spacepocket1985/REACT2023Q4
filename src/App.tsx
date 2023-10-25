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
  };

  SwapiDevService = new SwapiDevService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (link?: string, personName?: string): void => {
    this.SwapiDevService.getResource(link, personName).then(this.onPersonListLoaded);
  };

  onPersonListLoaded = (swapiData: ISwapiData): void => {
    this.setState({
      personsList: [...swapiData.results],
      nextPage: swapiData.next,
      previousPage: swapiData.previous,
    });
  };

  onClickPaginationButton = (url: string | null): void => {
    url && this.onRequest(url);
  };

  render() {
    const { personsList, nextPage, previousPage } = this.state;
    return (
      <>
        <header>
          <SearchForm />
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
