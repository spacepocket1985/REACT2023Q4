import { IRickAndMortyData } from '../interfaces/IRickAndMortyData';
import { ICharacter } from '../interfaces/ICharacter';

export class RickAndMortyAPI {
  _apiBase = 'https://rickandmortyapi.com/api/character';

  _queryBase = '';

  getResource = async (link = this._apiBase, query?: string): Promise<IRickAndMortyData> => {
    const url =
      query && query.length > 0 && query !== this._queryBase ? `${link}?name=${query}` : link;
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    return await res.json();
  };
  getCharacter = async (id: number): Promise<ICharacter> => {
    const url = `${this._apiBase}/${id}`;
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };
}
