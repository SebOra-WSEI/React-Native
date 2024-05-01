import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Character } from '@/src/types/character';
import { listStyles } from '@/src/styles/listStyles';

interface FlatListItemProps {
  character: Character;
}

export const CharactersListItem: React.FC<FlatListItemProps> = ({
  character,
}) => {
  const { image, name, species, status, gender } = character;

  return (
    <View style={listStyles.view}>
      <Image style={styles.img} source={{ uri: image }} />
      <View>
        <Text style={listStyles.name}>{name}</Text>
        <Text style={listStyles.secondText}>Species: {species}</Text>
        <Text style={listStyles.secondText}>Status: {status}</Text>
        <Text style={listStyles.secondText}>Gender: {gender}</Text>
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
