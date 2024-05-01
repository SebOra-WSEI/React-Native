import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator, StatusBar, ScrollView } from "react-native";
import { Character } from "../types/character";
import { endpoints } from "../utils/endpoints";
import { listStyles } from "../styles/listStyles";
import { UnknownError } from "../components/Error/UnknownError";
import { useGetDataById } from "../hooks/useGetDataById";
import { DataTable } from "react-native-paper";

export default function CharacterDetails() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } =
    useGetDataById<Character>(endpoints.characters, id as string);

  const {
    image,
    name,
    status,
    species,
    gender,
    origin,
    location,
    episode,
    type
  } = data ?? {};

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
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: image }} />
        <Text style={styles.name}>{name}</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Status</DataTable.Title>
            <DataTable.Title>Species</DataTable.Title>
            <DataTable.Title>Type</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{status}</DataTable.Cell>
            <DataTable.Cell>{species}</DataTable.Cell>
            <DataTable.Cell>{type || '-'}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <DataTable style={{ marginTop: 20 }}>
          <DataTable.Header>
            <DataTable.Title>Gender</DataTable.Title>
            <DataTable.Title>Origin</DataTable.Title>
            <DataTable.Title>Location</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{gender}</DataTable.Cell>
            <DataTable.Cell>{origin?.name}</DataTable.Cell>
            <DataTable.Cell>{location?.name}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{''}</DataTable.Title>
            <DataTable.Title>Episodes</DataTable.Title>
            <DataTable.Title>{''}</DataTable.Title>
          </DataTable.Header>
          {episode?.map((e) => (
            <DataTable.Row>
              <DataTable.Cell>{e}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 40,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  }
});
