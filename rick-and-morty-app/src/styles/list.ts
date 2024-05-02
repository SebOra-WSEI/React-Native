import { StyleSheet } from 'react-native';
import { buttonColor, secondColor } from '../constants/Colors';

export const listStyles = StyleSheet.create({
  filterView: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  filterText: {
    color: buttonColor,
  },
  loader: {
    justifyContent: 'center',
    flex: 1,
  },
});

export const listItemStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  secondText: {
    color: secondColor,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});
