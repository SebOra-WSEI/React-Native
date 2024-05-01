import { StyleSheet } from 'react-native';

export const listStyles = StyleSheet.create({
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
  filterView: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  filterText: {
    color: '#2196F3',
  },
  loader: {
    justifyContent: 'center',
    flex: 1,
  },
});
