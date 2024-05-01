import {
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Pressable,
  Text,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { CharactersListItem } from '../components/CharactersPage/CharactersListItem';
import { Loader } from '../components/Loader/Loader';
import { UnknownError } from '../components/Error/UnknownError';
import { useGetData } from '../hooks/useGetData';
import { CharacterGender, CharacterStatus } from '../types/character';
import { FilterCharactersModal } from '../components/CharactersPage/FilterCharactersModal';
import { endpoints } from '../utils/endpoints';

export default function CharactersList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { loading, error, data, hasNextPage } =
    useGetData(endpoints.characters, currentPage);

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
      <FilterCharactersModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setStatus={setStatus}
        setGender={setGender}
        name={name}
        setName={setName}
        species={species}
        setSpecies={setSpecies}
        type={type}
        setType={setType}
      />
      <View style={styles.filterView}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>
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
  filterView: {
    alignItems: 'flex-end',
    marginHorizontal: 20,
    marginVertical: 15,
  },
  filterText: {
    color: '#2196F3',
  },
  view: {
    justifyContent: 'center',
    flex: 1,
  },
});
