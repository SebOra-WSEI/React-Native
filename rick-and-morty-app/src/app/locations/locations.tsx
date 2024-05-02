import React, { useState } from 'react';
import {
  View,
  FlatList,
  Pressable,
  Text,
} from 'react-native';
import { useGetData } from '../../hooks/useGetData';
import { endpoints } from '../../routes/routes';
import { Location } from '../../types/location';
import { Error } from '../../components/Error/Error';
import { ListLoader } from '../../components/Loader/ListLoader';
import { LocationsListItem } from '../../components/Location/LocationsListItem';
import { listStyles } from '../../styles/list';
import { FilterLocationsModal } from '../../components/Location/FilterLocationsModal';
import { ScreenLoader } from '@/src/components/Loader/ScreenLoader';

export default function LocationsList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [dimension, setDimension] = useState<string>('');

  const { loading, error, data, hasNextPage } = useGetData<Location>({
    endpoint: endpoints.locations,
    currentPage,
    locationFilters: { name, type, dimension },
  });

  if (loading) {
    return <ScreenLoader />
  }

  if (error) {
    return <Error errorMsg={error} />;
  }

  const loadMoreData = () => hasNextPage && setCurrentPage(currentPage + 1);

  return (
    <View>
      <FilterLocationsModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        name={name}
        setName={setName}
        type={type}
        setType={setType}
        dimension={dimension}
        setDimension={setDimension}
        setCurrentPage={setCurrentPage}
      />
      <View style={listStyles.filterView}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text style={listStyles.filterText}>Filter</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <LocationsListItem location={item} />}
        keyExtractor={(item, index) => String(item.id) + index}
        ListFooterComponent={hasNextPage ? <ListLoader /> : null}
        onEndReached={loadMoreData}
      />
    </View>
  );
}
