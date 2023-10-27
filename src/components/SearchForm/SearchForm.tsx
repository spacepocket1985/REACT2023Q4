import React, { Component } from 'react';
import { ISearchState } from '../../interfaces/ISearchState';
import { ISearchFormProps } from '../../interfaces/ISearchFormProps';
import { getUserQuery, setUserQuery } from '../../utils/localStorageActions';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import './SearchForm.css';

class SearchForm extends Component<ISearchFormProps, ISearchState> {
  constructor(props: ISearchFormProps) {
    super(props);
  }

  state: ISearchState = {
    query: '',
    testError: false,
  };

  componentDidMount(): void {
    let query = getUserQuery();
    if (query === null) query = '';
    this.setState({ query });
  }

  onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.trim();
    this.setState({ query });
  };

  onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    setUserQuery(this.state.query);
    this.props.onSearchSubmit(this.state.query);
  };

  onError = (event: React.MouseEvent): void => {
    event.preventDefault();
    this.setState({ testError: !this.state.testError });
  };

  render() {
    const { buttonStatus, hasError } = this.props;
    const testErrorBoundary = this.state.testError ? <ErrorComponent /> : null;

    if (hasError) {
      () => {
        this.setState({ query: '' });
      };
    }

    return (
      <>
        {testErrorBoundary}
        <div className="search-wrapper">
          <h2>Rick and Morty API</h2>
          <form className="search-form">
            <input
              type="text"
              placeholder="name for search"
              value={this.state.query}
              onChange={this.onUpdateSearch}
            />
            <button
              disabled={buttonStatus}
              onClick={(e) => {
                this.onSubmit(e);
              }}
            >
              Search results
            </button>
            <button
              className="testBtn"
              disabled={buttonStatus}
              onClick={(e) => {
                this.onError(e);
              }}
            >
              Test ErrorBoundary
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default SearchForm;
