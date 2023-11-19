import { useParams } from 'react-router';
import { Outlet } from 'react-router-dom';

import SearchForm from '../components/SearchForm/SearchForm';
import CharacterList from '../components/CharactersList/CharactersList';
import CharacterInfo from '../components/CharacterInfo/CharacterInfo';

const MainPage = () => {
  const { characterId } = useParams();

  const isCharSelected = characterId ? 'with-info' : 'without-info';

  return (
    <>
      <main className={isCharSelected}>
        <SearchForm />
        <CharacterList />
      </main>
      {characterId ? <CharacterInfo /> : null}
      <Outlet />
    </>
  );
};

export default MainPage;
