import React, { Component } from 'react';
import { ISearchState } from '../../interfaces/ISearchState';
import { ISearchFormProps } from '../../interfaces/ISearchFormProps';
import { getUserQuery, setUserQuery } from '../../utils/localStorageActions';
import './SearchForm.css';

class SearchForm extends Component<ISearchFormProps, ISearchState> {
  constructor(props: ISearchFormProps) {
    super(props);
  }

  state: ISearchState = {
    query: '',
  };

  componentDidMount(): void {
    let query = getUserQuery();
    if (query === null) query = '';
    this.setState({ query });
  }

  onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value;
    this.setState({ query });
  };

  onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    setUserQuery(this.state.query);
    this.props.onSearchSubmit(this.state.query);
  };

  render() {
    return (
      <div className="search-wrapper">
        <h2>Rick and Morty API</h2>
        <form className="search-form">
          <input
            type="text"
            placeholder="person name for search"
            value={this.state.query}
            onChange={this.onUpdateSearch}
          />
          <button
            disabled={this.props.buttonStatus}
            onClick={(e) => {
              this.onSubmit(e);
            }}
          >
            Search results
          </button>
        </form>
      </div>
    );
  }
}

export default SearchForm;
