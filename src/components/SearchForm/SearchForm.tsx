import { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  render() {
    return (
      <div className="search-wrapper">
        <h2>The Star Wars API</h2>
        <form className="search-form">
          <input type="text" />
          <button type="submit">Search results</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
