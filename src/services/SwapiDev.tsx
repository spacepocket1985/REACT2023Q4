import { IPerson } from '../interfaces/IPerson';
import { ISwapiData } from '../interfaces/ISwapiData';

export class SwapiDevService {
  _apiBase = 'https://swapi.dev/api/people/';

  getResource3 = async (url: string = this._apiBase): Promise<ISwapiData> => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  };

  getResource = async (link = this._apiBase, personName?: string): Promise<ISwapiData> => {
    const url = personName && personName.length > 0 ? `${link}?search/=${personName}` : link;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  };

  getAllPeople = async (): Promise<IPerson[]> => {
    const res = await this.getResource(this._apiBase);
    console.log(res);
    return res.results.map(this._transformPerson);
  };

  _transformPerson = (person: IPerson): IPerson => {
    return {
      name: person.name,
      height: person.height,
      mass: person.mass,
      hair_color: person.hair_color,
      skin_color: person.skin_color,
    };
  };
}
