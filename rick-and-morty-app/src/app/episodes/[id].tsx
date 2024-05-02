import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { endpoints } from '../../routes/routes';
import { Error } from '../../components/Error/Error';
import { useGetDataById } from '../../hooks/useGetDataById';
import { Episode } from '@/src/types/episode';
import { DataTable } from 'react-native-paper';
import { TableTitle } from '@/src/components/Table/TableTitle';
import { Resident } from '@/src/components/Location/Resident';
import { detailsPageStyles } from '@/src/styles/details';
import { CommonDetailsPage } from '@/src/components/Details/CommonDetailsPage';
import { EPISODE_IMAGE_URL } from '@/src/constants/images';
import { secondColor } from '@/src/constants/Colors';
import { ScreenLoader } from '@/src/components/Loader/ScreenLoader';

export default function LocationDetails() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } = useGetDataById<Episode>(
    endpoints.episodes,
    id as string
  );

  if (loading) {
    return <ScreenLoader />;
  }

  if (error) {
    return <Error errorMsg={error} />;
  }

  const { name, air_date, episode, characters } = data ?? {};

  return (
    <CommonDetailsPage imageUrl={EPISODE_IMAGE_URL}>
      <Text style={detailsPageStyles.name}>{name}</Text>
      <Text style={styles.secondText}>{episode}</Text>
      <Text style={styles.secondText}>{air_date}</Text>
      <DataTable style={styles.dataTable}>
        <DataTable.Header>
          <TableTitle title='Characters' />
        </DataTable.Header>
        {characters?.map((r) => (
          <DataTable.Row key={r}>
            <Resident id={r.slice(r.lastIndexOf('/') + 1)} />
          </DataTable.Row>
        ))}
      </DataTable>
    </CommonDetailsPage>
  );
}

const styles = StyleSheet.create({
  dataTable: {
    marginTop: 15,
  },
  secondText: {
    color: secondColor,
  },
});
