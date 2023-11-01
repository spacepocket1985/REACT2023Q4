import { useState, useEffect } from 'react';
import { ISearchFormProps } from '../../interfaces/ISearchFormProps';
import { getUserQuery, setUserQuery } from '../../utils/localStorageActions';
import ErrorComponent from '../ErrorComponent/ErrorComponent';
import ricAndMortyImg from '../../assets/rick-and-morty.png';
import './SearchForm.css';

const SearchForm = (props: ISearchFormProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [testError, setTestError] = useState(false);

  useEffect(() => {
    let query = getUserQuery();
    if (query === null) query = '';
    setSearchQuery(query);
  }, []);

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.trim();
    setSearchQuery(query);
  };

  const onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    setUserQuery(searchQuery);
    props.onSearchSubmit(searchQuery);
  };

  const onError = (event: React.MouseEvent): void => {
    event.preventDefault();
    setTestError(!testError);
  };

  const { buttonStatus } = props;
  const testErrorBoundary = testError ? <ErrorComponent /> : null;

  return (
    <>
      {testErrorBoundary}
      <img src={ricAndMortyImg} className="rick-morty__img" alt="ricAndMortyImg" />
      <div className="search-form__wrapper">
        <h2>Rick and Morty API</h2>
        <form className="search-form">
          <input
            type="text"
            placeholder="name for search"
            value={searchQuery}
            onChange={onUpdateSearch}
          />
          <button
            disabled={buttonStatus}
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Search
          </button>
          <button
            className="test-button"
            disabled={buttonStatus}
            onClick={(e) => {
              onError(e);
            }}
          >
            Test ErrorBoundary
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
