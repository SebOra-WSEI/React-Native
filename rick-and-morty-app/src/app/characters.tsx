import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet
} from 'react-native';
import React, { useState } from 'react';
import { CharactersListItem } from '../components/CharactersPage/CharactersListItem';
import { Loader } from '../components/Loader/Loader';
import { UnknownError } from '../components/Error/UnknownError';
import { useGetCharacters } from '../hooks/useGetCharacters';
import { CharacterFilters } from '../types/character';
import RNPickerSelect from 'react-native-picker-select';

export default function CharactersList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<CharacterFilters | null>(null);

  const {
    loading,
    error,
    data,
    hasNextPage
  } = useGetCharacters(currentPage, filter)

  const loadMoreData = () =>
    hasNextPage && setCurrentPage(currentPage + 1);

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
        data={data}
        renderItem={({ item }) => <CharactersListItem character={item} />}
        keyExtractor={(item, index) => String(item.id) + index}
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
