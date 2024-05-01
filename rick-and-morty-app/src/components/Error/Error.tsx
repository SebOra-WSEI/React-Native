import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const Error: React.FC<{ errorMsg: string }> = ({ errorMsg }) => (
  <View style={styles.view}>
    <Text style={styles.text}>{errorMsg}</Text>
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
