import React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const Loader: React.FC = () => (
  <View>
    <ActivityIndicator style={{ marginVertical: 20 }} />
  </View>
);
