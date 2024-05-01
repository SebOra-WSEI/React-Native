import { UnknownError } from "@/src/components/Error/UnknownError";
import { useGetDataById } from "@/src/hooks/useGetDataById";
import { endpoints } from "@/src/routes/routes";
import { listStyles } from "@/src/styles/listStyles";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { DataTable } from "react-native-paper";
import { Episode } from "@/src/types/episode";

export const EpisodeName: React.FC<{ id: string }> = ({ id }) => {
  const { loading, error, data } =
    useGetDataById<Episode>(endpoints.episodes, id);

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
    <DataTable.Cell>{data?.name}</DataTable.Cell>
  );
};