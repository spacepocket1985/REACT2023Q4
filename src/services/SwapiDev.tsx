interface IPerson {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: Date;
  gender: string;
  homeworld: string;
  films: string[];
  species: [];
  vehicles: string[];
  starships: string[];
  created: Date;
  edited: Date;
  url: string;
}

class SwapiDevService {
  _apiBase = 'https://swapi.dev/api/people/';

  _baseOffset = 210;

  getResource = async (url: string = this._apiBase) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }
    const data = await res.json();

    return data;
  };

  getAllPeople = async () => {
    const res = await this.getResource(this._apiBase);
    console.log(res.results.map(this._transformPerson));
    return res.results.map(this._transformPerson);
  };

  // getPerson = async (id) => {
  //     const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
  //     return this._transformCharacter(res.data.results[0]);
  // }

  _transformPerson = (person: IPerson) => {
    return {
      name: person.name,
      height: person.height,
      mass: person.mass,
      hair_color: person.hair_color,
      skin_color: person.skin_color,
    };
  };
}

export default SwapiDevService;
