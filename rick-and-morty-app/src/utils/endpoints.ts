const ApiUrl = 'https://rickandmortyapi.com/api';

export const endpoints = {
  characters: `${ApiUrl}/character`,
  locations: `${ApiUrl}/location`,
} as const;
