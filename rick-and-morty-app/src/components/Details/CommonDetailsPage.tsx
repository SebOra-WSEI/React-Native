import React, { PropsWithChildren } from "react";
import { View, Image, ScrollView } from "react-native";
import { detailsPageStyles } from "@/src/styles/details";

interface CommonDetailsPageProps extends PropsWithChildren {
  imageUrl: string;
}

export const CommonDetailsPage: React.FC<CommonDetailsPageProps> = ({
  imageUrl,
  children
}) => (
  <ScrollView>
    <View style={detailsPageStyles.container}>
      <Image
        style={detailsPageStyles.img}
        source={{ uri: imageUrl }}
      />
      {children}
    </View>
  </ScrollView>
);