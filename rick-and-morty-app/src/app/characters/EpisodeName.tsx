import { Error } from '@/src/components/Error/Error';
import { useGetDataById } from '@/src/hooks/useGetDataById';
import { endpoints, routerBuilder } from '@/src/routes/routes';
import { listStyles } from '@/src/styles/list';
import React from 'react';
import {
  ActivityIndicator,
  View,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import { Episode } from '@/src/types/episode';
import { useRouter } from 'expo-router';
import { useGetPrevScreen } from '@/src/hooks/useGetPrevScreen';
import { buttonColor } from '@/src/constants/Colors';

export const EpisodeName: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();

  const { isPrevScreenTheSame } = useGetPrevScreen('episodes');

  const { loading, error, data } = useGetDataById<Episode>(
    endpoints.episodes,
    id
  );

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

  return (
    <>
      <DataTable.Cell>{data?.name}</DataTable.Cell>
      {!isPrevScreenTheSame && (
        <DataTable.Cell>
          <View style={styles.detailsCell}>
            <Pressable
              onPress={() =>
                router.navigate(routerBuilder.episode(String(data?.id)))
              }
            >
              <Text style={styles.filterText}>Details</Text>
            </Pressable>
          </View>
        </DataTable.Cell>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  detailsCell: {
    marginLeft: 'auto',
  },
  filterText: {
    color: buttonColor
  }
});
