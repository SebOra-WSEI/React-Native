import { StyleSheet } from 'react-native';

export const listItemStyles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  secondText: {
    color: '#777',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
  },
});
