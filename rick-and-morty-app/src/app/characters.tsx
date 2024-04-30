import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CharactersListItem } from '../components/CharactersPage/CharactersListItem';
import { Character } from '../types/character';
import { Loader } from '../components/Loader/Loader';
import { CharacterResponse } from '../types/response';
import { UnknownError } from '../components/Error/UnknownError';
import RNPickerSelect from 'react-native-picker-select';

enum CharacterFilters {
  Name = 'name',
  Status = 'status',
  Species = 'species',
  Type = 'type',
  Gender = 'gender',
}

export default function CharactersList() {
  const [characters, setCharacters] = useState<Array<Character>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allPages, setAllPages] = useState<number>(0);
  const [filter, setFilter] = useState<CharacterFilters | null>(null);

  const fetchData = async (page: number) => {
    await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}${!!filter ? `&${filter}=rick` : ''}`
    )
      .then((res) => res.json())
      .then((res: CharacterResponse) => {
        setAllPages(res.info.pages);
        setCharacters([...characters, ...res?.results]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (currentPage === allPages) {
      setHasNextPage(false);
    }
  }, [currentPage, allPages]);

  useEffect(() => {
    hasNextPage && fetchData(currentPage);
  }, [currentPage, filter]);

  const loadMoreData = () => hasNextPage && setCurrentPage(currentPage + 1);

  if (loading) {
    return (
      <View style={styles.view}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (error) {
    return <UnknownError />;
  }

  return (
    <View>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) => setFilter(value)}
        items={Object.entries(CharacterFilters).map(([label, value]) => ({
          label,
          value,
        }))}
      />
      <FlatList
        data={characters}
        renderItem={({ item }) => <CharactersListItem character={item} />}
        keyExtractor={(item, index) => String(item.id) + index}
        // ListFooterComponent={<Loader />}
        ListFooterComponent={hasNextPage ? <Loader /> : null}
        onEndReached={loadMoreData}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    justifyContent: 'center',
    flex: 1,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    marginHorizontal: 30,
    paddingVertical: 10,
    marginVertical: 15,
    fontSize: 16,
    borderColor: '#777',
  },
});
