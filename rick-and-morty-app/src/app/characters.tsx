
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
  ListRenderItemInfo,
  Image
} from 'react-native';
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

interface FlatListItemProps {
  character: Character;
}

export const FlatListItem: React.FC<FlatListItemProps> = ({
  character,
}) => {

  return (
    <View style={{
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderColor: '#ddd'
    }}>
      <Image style={{
        height: 50,
        width: 50,
        marginRight: 16
      }}
        source={{ uri: character.image }}
      />
      <View style={{
        justifyContent: 'space-around'
      }}>
        <Text style={{ fontSize: 16 }}>{character.name}</Text>
        <Text style={{ color: '#777' }}>{character.species}</Text>
        <Text style={{ color: '#777' }}>{character.status}</Text>
        <Text style={{ color: '#777' }}>{character.gender}</Text>
      </View>
    </View>
  );
};

export default function CharactersList() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  console.log(currentPage)

  const fetchData = async (page: number) => {
    await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((res) => {
        setCharacters([...characters, ...res?.results]);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
  };

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const renderLoader = () => (
    <View>
      <ActivityIndicator style={{ marginVertical: 20 }} />
    </View>
  );

  const loadMore = () => {
    setCurrentPage(currentPage + 1);
  }

  return (
    <FlatList
      data={characters}
      renderItem={({ item }) => (
        <FlatListItem character={item} />
      )}
      keyExtractor={(item) => String(item.id)}
      ListFooterComponent={renderLoader}
      onEndReached={loadMore}
    />
  );
};
