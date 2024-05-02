import { StyleSheet } from 'react-native';
import { secondColor } from '../constants/Colors';

export const modalStyles = StyleSheet.create({
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 14,
    borderColor: secondColor,
  },
});
