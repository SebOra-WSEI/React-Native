import { listStyles } from "@/src/styles/list";
import React from "react";
import { ActivityIndicator, View } from "react-native";

export const ScreenLoader: React.FC = () => (
  <View style={listStyles.loader}>
    <ActivityIndicator size='large' />
  </View>
);