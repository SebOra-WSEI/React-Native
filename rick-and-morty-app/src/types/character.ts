export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: '';
  location: '';
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

export enum CharacterFilters {
  Name = 'name',
  Status = 'status',
  Species = 'species',
  Type = 'type',
  Gender = 'gender',
}
