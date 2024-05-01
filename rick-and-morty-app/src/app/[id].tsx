import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { useGetData } from "../hooks/useGetData";
import { Character } from "../types/character";
import { endpoints } from "../utils/endpoints";
import { listStyles } from "../styles/listStyles";
import { UnknownError } from "../components/Error/UnknownError";
import { useGetDataById } from "../hooks/useGetDataById";


export default function CharacterDetails() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } =
    useGetDataById<Character>(endpoints.characters, id as string);


  if (loading) {
    return (
      <View style={listStyles.loader}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (error) {
    return <UnknownError />;
  }

  return (
    <View>
      <Text>abc</Text>
    </View>
  );
}