import { Component } from 'react';
import { SwapiDevService } from './services/SwapiDev';
import { IPerson } from './interfaces/IPerson';
import { IAppState } from './interfaces/IAppState';
import SearchForm from './components/SearchForm/SearchForm';
import PersonsList from './components/PersonsList/PersonsList';

import './App.css';

class App extends Component {
  state: IAppState = {
    personsList: [],
    loading: true,
    error: false,
  };

  SwapiDevService = new SwapiDevService();

  componentDidMount() {
    this.onRequest();
  }

  onRequest = (): void => {
    this.SwapiDevService.getAllPeople().then(this.onPersonListLoaded);
  };

  onPersonListLoaded = (newPersonsList: IPerson[]): void => {
    this.setState({ personsList: [...this.state.personsList, ...newPersonsList] });
  };

  render() {
    const persons = this.state.personsList;
    return (
      <>
        <header>
          <h1>Header title</h1>
          <SearchForm />
        </header>
        <main>
          <PersonsList personsList={persons} />
        </main>
      </>
    );
  }
}

export default App;
