import { UnknownError } from "@/src/components/Error/UnknownError";
import { useGetDataById } from "@/src/hooks/useGetDataById";
import { endpoints } from "@/src/routes/routes";
import { listStyles } from "@/src/styles/listStyles";
import { Character } from "@/src/types/character";
import React from "react";
import { Text, ActivityIndicator, View, Image, StyleSheet } from "react-native";

export const Resident: React.FC<{ id: string }> = ({ id }) => {
  const { loading, error, data } =
    useGetDataById<Character>(endpoints.characters, id);

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

  return (
    <View style={styles.view}>
      <Image style={styles.img} source={{ uri: data?.image }} />
      <View style={{
        marginLeft: 10
      }}>
        <Text style={styles.text}>
          {data?.name}
        </Text>
        <Text style={listStyles.secondText}>Species: {data?.species}</Text>
        <Text style={listStyles.secondText}>Status: {data?.status}</Text>
        <Text style={listStyles.secondText}>Gender: {data?.gender}</Text>
      </View>
    </View>
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
  }
});
