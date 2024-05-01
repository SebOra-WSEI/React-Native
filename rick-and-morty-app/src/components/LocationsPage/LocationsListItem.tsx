import { listItemStyles } from "@/src/styles/listItem";
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
    <View style={listItemStyles.view}>
      <View>
        <Text style={listItemStyles.name}>{name}</Text>
        <Text style={listItemStyles.secondText}>Type: {type}</Text>
        <Text style={listItemStyles.secondText}>Dimension: {dimension}</Text>
      </View>
    </View>
  )
};