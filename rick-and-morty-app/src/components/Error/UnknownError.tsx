import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const UnknownError: React.FC = () => (
  <View style={styles.view}>
    <Text style={styles.text}>Unknown Error</Text>
  </View>
);

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 26,
    fontWeight: 'bold',
  },
});
