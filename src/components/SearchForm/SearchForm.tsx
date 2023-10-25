import { Component } from 'react';
import { ISearchState } from '../../interfaces/ISearchState';
import { ISearchFormProps } from '../../interfaces/ISearchFormProps';
import './SearchForm.css';

class SearchForm extends Component<ISearchFormProps, ISearchState> {
  constructor(props: ISearchFormProps) {
    super(props);
  }
  state: ISearchState = {
    query: '',
  };

  onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const queryString = event.target.value;
    this.setState({ query: queryString });
    this.props.onSearch(queryString);
  };

  onSubmit = (): void => {
    this.props.onSearch(this.state.query);
  };

  render() {
    return (
      <div className="search-wrapper">
        <h2>The Star Wars API</h2>
        <form className="search-form">
          <input
            type="text"
            placeholder="person name for search"
            value={this.state.query}
            onChange={this.onUpdateSearch}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              this.props.onSearchSubmit();
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
