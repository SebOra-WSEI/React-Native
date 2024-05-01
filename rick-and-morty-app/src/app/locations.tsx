import React, { useState } from 'react';
import { View, ActivityIndicator, StyleSheet, FlatList } from 'react-native';
import { useGetData } from '../hooks/useGetData';
import { endpoints } from '../utils/endpoints';
import { Location } from '../types/location';
import { UnknownError } from '../components/Error/UnknownError';
import { ListLoader } from '../components/ListLoader/ListLoader';
import { LocationsListItem } from '../components/LocationsPage/LocationsListItem';


export default function LocationsList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { loading, error, data, hasNextPage } =
    useGetData<Location>(endpoints.locations, currentPage);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  if (error) {
    return <UnknownError />;
  }

  const loadMoreData = () =>
    hasNextPage && setCurrentPage(currentPage + 1);

  return (
    <View>
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


const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    flex: 1,
  },
});
