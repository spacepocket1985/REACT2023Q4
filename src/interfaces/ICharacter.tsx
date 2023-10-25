export interface ICharacter {
  id: number;
  name: string;
  status: string;
  type: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  gender: string;
  species: string;
  created: Date;
  url: string;
}
