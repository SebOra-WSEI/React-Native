import { Character } from './character';

export interface InfoResponse {
  count: number;
  pages: number;
  next: string;
  prev: string | null;
}

export interface CharacterResponse {
  info: InfoResponse;
  results: Array<Character>;
}
