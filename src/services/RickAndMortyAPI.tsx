import { IRickAndMortyData } from '../interfaces/IRickAndMortyData';

export class RickAndMortyAPI {
  _apiBase = 'https://rickandmortyapi.com/api/character';

  getResource = async (link = this._apiBase, personName?: string): Promise<IRickAndMortyData> => {
    const url = personName && personName.length > 0 ? `${link}?name=${personName}` : link;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };
}
