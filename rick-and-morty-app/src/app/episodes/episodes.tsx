import { useState } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Pressable,
  FlatList,
} from 'react-native';
import { endpoints } from '../../routes/routes';
import { useGetData } from '../../hooks/useGetData';
import { Episode } from '../../types/episode';
import { listStyles } from '../../styles/list';
import { Error } from '../../components/Error/Error';
import { ListLoader } from '../../components/ListLoader/ListLoader';
import { FilterEpisodesModal } from '../../components/Episode/FilterEpisodesModal';
import { EpisodesListItem } from '@/src/components/Episode/EpisodesListItem';

export default function EpisodesList() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [episodeCode, setEpisodeCode] = useState<string>('');

  const { loading, error, data, hasNextPage } = useGetData<Episode>({
    endpoint: endpoints.episodes,
    currentPage,
    episodeFilters: { name, episodeCode },
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
      <FilterEpisodesModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        name={name}
        setName={setName}
        episode={episodeCode}
        setEpisodeCode={setEpisodeCode}
        setCurrentPage={setCurrentPage}
      />

      <View style={listStyles.filterView}>
        <Pressable onPress={() => setIsModalVisible(true)}>
          <Text style={listStyles.filterText}>Filter</Text>
        </Pressable>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <EpisodesListItem episode={item} />}
        keyExtractor={(item, index) => String(item.id) + index}
        ListFooterComponent={hasNextPage ? <ListLoader /> : null}
        onEndReached={loadMoreData}
      />
    </View>
  );
}
