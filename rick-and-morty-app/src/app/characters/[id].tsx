import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, StyleSheet, Image, Text, ActivityIndicator, StatusBar, ScrollView } from "react-native";
import { Character } from "../../types/character";
import { endpoints } from "../../routes/routes";
import { listStyles } from "../../styles/listStyles";
import { UnknownError } from "../../components/Error/UnknownError";
import { useGetDataById } from "../../hooks/useGetDataById";
import { DataTable } from "react-native-paper";
import { EpisodeName } from "./EpisodeName";

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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image style={styles.img} source={{ uri: image }} />
        <Text style={styles.name}>{name}</Text>
        <DataTable>
          <DataTable.Header>
            <TableTitle title='Status' />
            <TableTitle title='Species' />
            <TableTitle title='Type' />
          </DataTable.Header>
          <DataTable.Row>
            <TableCell value={status} />
            <TableCell value={species} />
            <TableCell value={type} />
          </DataTable.Row>
        </DataTable>
        <DataTable style={{ marginTop: 20 }}>
          <DataTable.Header>
            <TableTitle title='Gender' />
            <TableTitle title='Origin' />
            <TableTitle title='Location' />
          </DataTable.Header>
          <DataTable.Row>
            <TableCell value={gender} />
            <TableCell value={origin?.name} />
            <TableCell value={location?.name} />
          </DataTable.Row>
        </DataTable>
        <DataTable>
          <DataTable.Header>
            <TableTitle title='' />
            <TableTitle title='Episodes' />
            <TableTitle title='' />
          </DataTable.Header>
          {episode?.map((e) => (
            <DataTable.Row key={e}>
              <EpisodeName id={e.slice(e.lastIndexOf('/') + 1)} />
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
};

const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <DataTable.Title style={{ justifyContent: 'center' }}>{title}</DataTable.Title>
);

const TableCell: React.FC<{ value?: string }> = ({ value }) => (
  <DataTable.Cell style={{ justifyContent: 'center' }}>{value || '-'}</DataTable.Cell>
);

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
