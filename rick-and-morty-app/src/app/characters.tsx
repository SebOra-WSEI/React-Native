
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CharactersListItem } from '../components/CharactersPage/CharactersListItem';
import { Character } from '../types/character';
import { Loader } from '../components/Loader/Loader';

export default function CharactersList() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
      });
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1)
  }, [])

  const loadMoreData = () => {
    setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size='large' />
      </View>
    );
  };

  return (
    <FlatList
      data={characters}
      renderItem={({ item }) => (
        <CharactersListItem character={item} />
      )}
      keyExtractor={(item, index) => String(item.id) + index}
      ListFooterComponent={<Loader />}
      onEndReached={loadMoreData}
    />
  );
};

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    flex: 1
  },
})
