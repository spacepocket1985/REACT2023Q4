import { Component } from 'react';
import './SearchForm.css';

class SearchForm extends Component {
  render() {
    return (
      <div className="search-wrapper">
        <form className="search-form">
          <input type="text" />
          <button>Search results</button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
