import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { getUserQuery, setUserQuery } from '../../utils/localStorageActions';
import { RootState } from '../../store/store';
import { setSearchValue } from '../../store/slices/searchFormSlice';
import ricAndMortyImg from '../../assets/rick-and-morty.png';
import './SearchForm.css';

const SearchForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let query = getUserQuery();
    if (query === null) query = '';

    navigate(`/search/${query}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const search = useSelector((state: RootState) => {
    return state.searchValue.searchValue;
  });

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.trim();
    dispatch(setSearchValue(query));
  };

  const onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    setUserQuery(search);
    navigate(`/search/${search}`);
  };

  return (
    <>
      <img src={ricAndMortyImg} className="rick-morty__img" alt="ricAndMortyImg" />
      <div className="search-form__wrapper">
        <h2>Rick and Morty API</h2>
        <form className="search-form">
          <input
            type="text"
            data-testid="my-input"
            placeholder="name for search"
            value={search}
            onChange={onUpdateSearch}
          />
          <button
            // disabled={appData.loading}
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
