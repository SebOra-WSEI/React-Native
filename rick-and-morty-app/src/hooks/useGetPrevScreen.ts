import { useNavigation } from 'expo-router';
import { ViewType } from '../types/view';

type UseGetPrevScreenResult = { isPrevScreenTheSame: boolean };

export const useGetPrevScreen = (screen: ViewType): UseGetPrevScreenResult => {
  const navigation = useNavigation();
  const routes = navigation.getState().routes;

  const isPrevScreenTheSame = String(routes[routes.length - 2].name).includes(
    screen
  );

  return { isPrevScreenTheSame };
};
