import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
} from 'react-native';
import React, { useState } from 'react';
import { CharactersListItem } from '../../components/Character/CharactersListItem';
import { ListLoader } from '../../components/ListLoader/ListLoader';
import { Error } from '../../components/Error/Error';
import { useGetData } from '../../hooks/useGetData';
import {
  Character,
  CharacterGender,
  CharacterStatus,
} from '../../types/character';
import { FilterCharactersModal } from '../../components/Character/FilterCharactersModal';
import { endpoints } from '../../routes/routes';
import { listStyles } from '../../styles/listStyles';

export default function CharactersList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [status, setStatus] = useState<CharacterStatus | undefined>(undefined);
  const [gender, setGender] = useState<CharacterGender | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [species, setSpecies] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { loading, error, data, hasNextPage } = useGetData<Character>({
    endpoint: endpoints.characters,
    currentPage,
    characterFilters: { name, status, species, gender, type },
  });

  if (loading) {
    return (
      <View style={listStyles.loader}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (error) {
    return <Error errorMsg={error} />;
  }

  const loadMoreData = () => hasNextPage && setCurrentPage(currentPage + 1);

  return (
    <View>
      <FilterCharactersModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setStatus={setStatus}
        status={status}
        setGender={setGender}
        gender={gender}
        setName={setName}
        name={name}
        setSpecies={setSpecies}
        species={species}
        setType={setType}
        type={type}
        setCurrentPage={setCurrentPage}
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
