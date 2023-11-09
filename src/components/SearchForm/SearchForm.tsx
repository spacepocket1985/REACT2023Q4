import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import AppContext from '../../context/AppContext';
import { setUserQuery, getUserQuery } from '../../utils/localStorageActions';
import ricAndMortyImg from '../../assets/rick-and-morty.png';
import './SearchForm.css';

const SearchForm = () => {
  const { appData, setAppData } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    let query = getUserQuery();
    if (query === null) query = '';
    navigate(`/search/${query}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.trim();
    setAppData({ ...appData, query });
  };

  const onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    setUserQuery(appData.query);
    navigate(`/search/${appData.query}`);
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
            value={appData.query}
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
