import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { CharactersListItem } from '../../components/CharactersPage/CharactersListItem';
import { ListLoader } from '../../components/ListLoader/ListLoader';
import { UnknownError } from '../../components/Error/UnknownError';
import { useGetData } from '../../hooks/useGetData';
import {
  Character,
  CharacterGender,
  CharacterStatus,
} from '../../types/character';
import { FilterCharactersModal } from '../../components/CharactersPage/FilterCharactersModal';
import { endpoints } from '../../utils/endpoints';
import { listStyles } from '../../styles/listStyles';

export default function CharactersList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { loading, error, data, hasNextPage } = useGetData<Character>(
    endpoints.characters,
    currentPage
  );

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

  const loadMoreData = () => hasNextPage && setCurrentPage(currentPage + 1);

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
      <View style={listStyles.filterView}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text style={listStyles.filterText}>Filter</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <CharactersListItem character={item} />}
        keyExtractor={(item, index) => String(item.id) + index}
        ListFooterComponent={hasNextPage ? <ListLoader /> : null}
        onEndReached={loadMoreData}
      />
    </View>
  );
}
