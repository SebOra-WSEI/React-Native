
import { ImageBackground, StatusBar, StyleSheet, View, Text, ActivityIndicator, ScrollView } from 'react-native';
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
  const [page, setPage] = useState<number>(1);

  const fetchData = async () => {
    await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
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
    <ImageBackground source={backgroundUri}>
      <ScrollView>
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
                <DataTable.Cell>
                  <Text style={styles.cell}>{c.name}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.cell}>{c.status}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.cell}>{c.species}</Text>
                </DataTable.Cell>
                <DataTable.Cell>
                  <Text style={styles.cell}>{c.gender}</Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </DataTable>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  },
  cell: {
    color: '#ffe5d9',
    fontWeight: '400',
    fontSize: 14
  }
});
