import { useRouter } from 'next/router';

import SearchForm from '../components/SearchForm/SearchForm';
import CharacterList from '../components/CharactersList/CharactersList';
import CharacterInfo from '../components/CharacterInfo/CharacterInfo';

const MainPage = () => {
  const router = useRouter();
  const { characterId } = router.query;

  const isCharSelected = characterId ? 'with-info' : 'without-info';

  return (
    <>
      <main className={isCharSelected}>
        <SearchForm />
        <CharacterList />
      </main>
      {characterId ? <CharacterInfo /> : null}
    </>
  );
};

export default MainPage;
