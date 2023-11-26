import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

// import { getUserQuery, setUserQuery } from '../../utils/localStorageActions';
import { RootState } from '../../store/store';
import { setSearchValue } from '../../store/slices/searchFormSlice';
import Image from 'next/image';

const SearchForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   let query = getUserQuery();
  //   if (query === null) query = '';

  //   navigate(`/search/${query}`);

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const search = useSelector((state: RootState) => {
    return state.searchValue.searchValue;
  });

  const onUpdateSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const query = event.target.value.trim();
    dispatch(setSearchValue(query));
  };

  const onSubmit = (event: React.MouseEvent): void => {
    event.preventDefault();
    // setUserQuery(search);
    router.push({ pathname: '/MainPage/', query: { queryParam: search } });
  };

  return (
    <>
      <Image src="/rick-and-morty.png" alt="ricAndMortyImg" width={250} height={198} />
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
