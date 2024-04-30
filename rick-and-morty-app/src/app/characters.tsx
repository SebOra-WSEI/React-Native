
import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { CharactersListItem } from '../components/CharactersPage/CharactersListItem';
import { Character } from '../types/character';
import { Loader } from '../components/Loader/Loader';
import { CharacterResponse } from '../types/response';
import { UnknownError } from '../components/Error/UnknownError';

export default function CharactersList() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPages, setAllPages] = useState<number>(0);

  const fetchData = async (page: number) => {
    await fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
      .then((res) => res.json())
      .then((res: CharacterResponse) => {
        setAllPages(res.info.pages)
        setHasNextPage(!!res?.info)
        setCharacters([...characters, ...res?.results]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err)
        setLoading(false);
      });
  };

  useEffect(() => {
    if (currentPage >= allPages) {
      setHasNextPage(false)
    }
  }, [currentPage, allPages])

  useEffect(() => {
    hasNextPage && fetchData(currentPage);
  }, [currentPage]);

  const loadMoreData = () => {
    hasNextPage && setCurrentPage(currentPage + 1);
  };

  if (loading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size='large' />
      </View>
    );
  };

  if (error) {
    return <UnknownError />
  }

  return (
    <FlatList
      data={characters}
      renderItem={({ item }) => (
        <CharactersListItem character={item} />
      )}
      keyExtractor={(item, index) => String(item.id) + index}
      ListFooterComponent={hasNextPage ? <Loader /> : null}
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
