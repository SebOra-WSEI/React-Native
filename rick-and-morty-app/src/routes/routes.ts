const ApiUrl = 'https://rickandmortyapi.com/api';

export const endpoints = {
  characters: `${ApiUrl}/character`,
  locations: `${ApiUrl}/location`,
  episodes: `${ApiUrl}/episode`,
} as const;

export const routerBuilder = {
  characters: '/characters/characters',
  character: (id: string) => `/characters/${id}`,
  locations: '/locations/locations',
  location: (id: string) => `/locations/${id}`,
  episodes: '/episodes/episodes',
  episode: (id: string) => `/episodes/${id}`,
} as const;
