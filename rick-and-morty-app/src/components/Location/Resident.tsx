import { Error } from '@/src/components/Error/Error';
import { buttonColor, secondColor } from '@/src/constants/Colors';
import { useGetDataById } from '@/src/hooks/useGetDataById';
import { useGetPrevScreen } from '@/src/hooks/useGetPrevScreen';
import { endpoints, routerBuilder } from '@/src/routes/routes';
import { Character } from '@/src/types/character';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, View, Image, StyleSheet, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';
import { ScreenLoader } from '../Loader/ScreenLoader';

export const Resident: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();

  const { isPrevScreenTheSame } = useGetPrevScreen('characters');

  const { loading, error, data } = useGetDataById<Character>(
    endpoints.characters,
    id
  );

  if (loading) {
    return <ScreenLoader />;
  }

  if (error) {
    return <Error errorMsg={error} />;
  }

  return (
    <>
      <DataTable.Cell>
        <View style={styles.view}>
          <Image style={styles.img} source={{ uri: data?.image }} />
          <View
            style={{
              marginLeft: 10,
            }}
          >
            <Text style={styles.text}>{data?.name}</Text>
            <Text style={styles.secondText}>Species: {data?.species}</Text>
            <Text style={styles.secondText}>Status: {data?.status}</Text>
            <Text style={styles.secondText}>Gender: {data?.gender}</Text>
          </View>
        </View>
      </DataTable.Cell>
      {!isPrevScreenTheSame && (
        <DataTable.Cell>
          <View style={styles.detailsButton}>
            <Pressable
              onPress={() =>
                router.navigate(routerBuilder.character(String(data?.id)))
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

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  img: {
    height: 80,
    width: 80,
    borderRadius: 100,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  detailsButton: {
    marginLeft: 'auto',
  },
  secondText: {
    color: secondColor,
  },
  filterText: {
    color: buttonColor,
  },
});
