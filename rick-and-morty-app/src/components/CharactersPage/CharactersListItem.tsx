import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Character } from '@/src/types/character';
import { listItemStyles } from '@/src/styles/listItem';

interface FlatListItemProps {
  character: Character;
}

export const CharactersListItem: React.FC<FlatListItemProps> = ({
  character,
}) => {
  const { image, name, species, status, gender } = character;

  return (
    <View style={listItemStyles.view}>
      <Image style={styles.img} source={{ uri: image }} />
      <View>
        <Text style={listItemStyles.name}>{name}</Text>
        <Text style={listItemStyles.secondText}>Species: {species}</Text>
        <Text style={listItemStyles.secondText}>Status: {status}</Text>
        <Text style={listItemStyles.secondText}>Gender: {gender}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  img: {
    height: 50,
    width: 50,
    marginRight: 16,
    marginVertical: 10,
  },
});
