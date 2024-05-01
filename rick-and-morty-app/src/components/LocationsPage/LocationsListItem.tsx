import { listStyles } from "@/src/styles/listStyles";
import { Location } from "@/src/types/location";
import React from "react";
import { View, Text } from "react-native";

interface LocationsListItemProps {
  location: Location
}

export const LocationsListItem: React.FC<LocationsListItemProps> = ({
  location
}) => {
  const { name, type, dimension } = location;

  return (
    <View style={listStyles.view}>
      <View>
        <Text style={listStyles.name}>{name}</Text>
        <Text style={listStyles.secondText}>Type: {type}</Text>
        <Text style={listStyles.secondText}>Dimension: {dimension}</Text>
      </View>
    </View>
  )
};