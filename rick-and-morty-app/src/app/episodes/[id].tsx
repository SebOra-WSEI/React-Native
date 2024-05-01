import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, StyleSheet, StatusBar } from "react-native";
import { endpoints } from "../../routes/routes";
import { listStyles } from "../../styles/listStyles";
import { UnknownError } from "../../components/Error/UnknownError";
import { useGetDataById } from "../../hooks/useGetDataById";
import { Episode } from "@/src/types/episode";
import { DataTable } from "react-native-paper";
import { TableTitle } from "@/src/components/Table/TableTitle";
import { Resident } from "@/src/components/Location/Resident";

export default function LocationDetails() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } =
    useGetDataById<Episode>(endpoints.episodes, id as string);

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

  const {
    name,
    air_date,
    episode,
    characters
  } = data ?? {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{ uri: 'https://images.unsplash.com/photo-1516724562728-afc824a36e84?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
        <Text style={styles.name}>{name}</Text>
        <Text style={listStyles.secondText}>{episode}</Text>
        <Text style={listStyles.secondText}>{air_date}</Text>
        <DataTable style={styles.dataTable}>
          <DataTable.Header>
            <TableTitle title='Characters' />
          </DataTable.Header>
          {characters?.map((r) => (
            <DataTable.Row key={r}>
              <DataTable.Cell>
                <Resident id={r.slice(r.lastIndexOf('/') + 1)} />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 40,
  },
  img: {
    height: 200,
    width: 200,
    borderRadius: 100
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dataTable: {
    marginTop: 15
  }
});
