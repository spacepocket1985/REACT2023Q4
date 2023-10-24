export interface IPerson {
  name: string;
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color?: string;
  birth_year?: Date;
  gender?: string;
  homeworld?: string;
  films?: string[];
  species?: [];
  vehicles?: string[];
  starships?: string[];
  created?: Date;
  edited?: Date;
  url?: string;
}
