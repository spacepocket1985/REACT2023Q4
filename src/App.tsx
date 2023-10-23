import { Component } from 'react';
import SearchForm from './components/SearchForm/SearchForm';
import PeopleList from './components/PeopleList/PeopleList';

import './App.css';

class App extends Component {
  render() {
    return (
      <>
        <header>
          <h1>Header title</h1>
          <SearchForm />
        </header>
        <main>
          <PeopleList />
        </main>
      </>
    );
  }
}

export default App;
