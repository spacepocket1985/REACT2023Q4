import { IRickAndMortyData } from '../types/interfaces/IRickAndMortyData';
import { ICharacter } from '../types/interfaces/ICharacter';

const RickAndMortyAPI = () => {
  const _apiBase = 'https://rickandmortyapi.com/api/character';

  const _queryBase = '';

  const getResource = async (link = _apiBase, query?: string): Promise<IRickAndMortyData> => {
    const url = query && query.length > 0 && query !== _queryBase ? `${link}?name=${query}` : link;
    const res = await fetch(url);
    console.log(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  const getCharacter = async (id: number): Promise<ICharacter> => {
    const url = `${_apiBase}/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  return { getCharacter, getResource, _apiBase, _queryBase };
};

export default RickAndMortyAPI;
