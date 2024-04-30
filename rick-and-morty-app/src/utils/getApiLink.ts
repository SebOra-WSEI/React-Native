import { Href } from 'expo-router';
import { ViewType } from '../types/view';

export const getApiLink = (view: ViewType): Href<string> => {
  let link: Href<string>;
  switch (view) {
    case 'character':
      link = '/characters';
      break;
    case 'location':
      link = '/locations';
      break;
    case 'episode':
      link = '/episodes';
      break;
    default:
      link = '/characters';
      break;
  }

  return link;
};
