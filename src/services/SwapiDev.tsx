import { IPerson } from '../interfaces/IPerson';
import { ISwapiData } from '../interfaces/ISwapiData';

export class SwapiDevService {
  _apiBase = 'https://swapi.dev/api/people/';

  _baseOffset = 210;

  getResource = async (url: string = this._apiBase): Promise<ISwapiData> => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  };

  getAllPeople = async (): Promise<IPerson[]> => {
    const res = await this.getResource(this._apiBase);
    console.log(res);
    return res.results.map(this._transformPerson);
  };

  // getPerson = async (id) => {
  //     const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  //     return this._transformCharacter(res.data.results[0]);
  // }

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
