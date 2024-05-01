import { UnknownError } from "@/src/components/Error/UnknownError";
import { Resident } from "@/src/components/Location/Resident";
import { TableCell } from "@/src/components/Table/TableCell";
import { TableTitle } from "@/src/components/Table/TableTitle";
import { useGetDataById } from "@/src/hooks/useGetDataById";
import { endpoints } from "@/src/routes/routes";
import { listStyles } from "@/src/styles/listStyles";
import { Location } from "@/src/types/location";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, ActivityIndicator, ScrollView, StatusBar, View, StyleSheet, Image, FlatList } from "react-native";
import { DataTable } from "react-native-paper";

export default function LocationDetails() {
  const { id } = useLocalSearchParams();

  const { loading, error, data } =
    useGetDataById<Location>(endpoints.locations, id as string);

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

  const { name, type, dimension, residents } = data ?? {};

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={{ uri: 'https://images.unsplash.com/photo-1654263391025-4c4809a37f5c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }}
        />
        <Text style={styles.name}>{name}</Text>
        <DataTable>
          <DataTable.Header>
            <TableTitle title="Type" />
            <TableTitle title="Dimension" />
          </DataTable.Header>
          <DataTable.Row>
            <TableCell value={type} />
            <TableCell value={dimension} />
          </DataTable.Row>
        </DataTable>
        <DataTable>
          <DataTable.Header>
            <TableTitle title="Residents" />
          </DataTable.Header>
          {residents?.map((r) => (
            <DataTable.Row key={r}>
              <DataTable.Cell>
                <Resident id={r.slice(r.lastIndexOf('/') + 1)} />
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </ScrollView>
  )
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
  title: {
    justifyContent: 'center'
  }
});
