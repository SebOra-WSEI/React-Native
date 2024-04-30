
import { ImageBackground, StatusBar, StyleSheet, View, Text, FlatList, ActivityIndicator } from 'react-native';
import { backgroundUri } from '../constants/backgroudURI';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import { textColor } from '../constants/Colors';

interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: '';
  location: '';
  image: string;
  episode: Array<string>;
  url: string;
  created: string;
}

const charactersTableHeaders = [
  'Name',
  'Status',
  'Species',
  'Gender'
]

export default function CharactersList() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    await fetch('https://rickandmortyapi.com/api/character?page=1')
      .then((res) => res.json())
      .then((res) => {
        setCharacters(res?.results);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ImageBackground source={backgroundUri} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Characters</Text>
        {loading && (<ActivityIndicator />)}
        <DataTable style={{ marginTop: 20 }}>
          <DataTable.Header>
            {charactersTableHeaders.map((header) => (
              <DataTable.Title>
                <Text style={styles.tableHeader}>{header}</Text>
              </DataTable.Title>
            ))}
          </DataTable.Header>
          {characters.map((c) => (
            <DataTable.Row>
              <DataTable.Cell>{c.name}</DataTable.Cell>
              <DataTable.Cell>{c.status}</DataTable.Cell>
              <DataTable.Cell>{c.species}</DataTable.Cell>
              <DataTable.Cell>{c.gender}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 10,
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: textColor,
  },
  tableHeader: {
    color: textColor,
    fontSize: 15,
    fontWeight: 'bold'
  }
});
