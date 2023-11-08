import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';

import AppContext from '../../context/AppContext';
import { getUserQuery, setUserQuery } from '../../utils/localStorageActions';
import ricAndMortyImg from '../../assets/rick-and-morty.png';
import './SearchForm.css';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { appData } = useContext(AppContext);
  const navigate = useNavigate();

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
    navigate(`/search/${searchQuery}`);
  };

  return (
    <>
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
            disabled={appData.loading}
            onClick={(e) => {
              onSubmit(e);
            }}
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
};

export default SearchForm;
