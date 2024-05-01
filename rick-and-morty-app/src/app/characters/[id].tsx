import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Character } from '../../types/character';
import { endpoints } from '../../routes/routes';
import { listStyles } from '../../styles/listStyles';
import { Error } from '../../components/Error/Error';
import { useGetDataById } from '../../hooks/useGetDataById';
import { DataTable } from 'react-native-paper';
import { EpisodeName } from './EpisodeName';
import { TableTitle } from '@/src/components/Table/TableTitle';
import { TableCell } from '@/src/components/Table/TableCell';
import { detailsPageStyles } from '@/src/styles/details';
import { CommonDetailsPage } from '@/src/components/Details/CommonDetailsPage';

export default function CharacterDetails() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } = useGetDataById<Character>(
    endpoints.characters,
    id as string
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

  const {
    image,
    name,
    status,
    species,
    gender,
    origin,
    location,
    episode,
    type,
  } = data ?? {};

  return (
    <CommonDetailsPage imageUrl={image ?? ''}>
      <Text style={detailsPageStyles.name}>{name}</Text>
      <DataTable>
        <DataTable.Header>
          <TableTitle title='Status' />
          <TableTitle title='Species' />
          <TableTitle title='Type' />
        </DataTable.Header>
        <DataTable.Row>
          <TableCell value={status} />
          <TableCell value={species} />
          <TableCell value={type} />
        </DataTable.Row>
      </DataTable>
      <DataTable style={{ marginTop: 20 }}>
        <DataTable.Header>
          <TableTitle title='Gender' />
          <TableTitle title='Origin' />
          <TableTitle title='Location' />
        </DataTable.Header>
        <DataTable.Row>
          <TableCell value={gender} />
          <TableCell value={origin?.name} />
          <TableCell value={location?.name} />
        </DataTable.Row>
      </DataTable>
      <DataTable>
        <DataTable.Header>
          <TableTitle title='' />
          <TableTitle title='Episodes' />
          <TableTitle title='' />
        </DataTable.Header>
        {episode?.map((e) => (
          <DataTable.Row key={e}>
            <EpisodeName id={e.slice(e.lastIndexOf('/') + 1)} />
          </DataTable.Row>
        ))}
      </DataTable>
    </CommonDetailsPage>
  );
}
