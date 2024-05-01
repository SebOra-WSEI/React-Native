import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { Character } from '@/src/types/character';

interface FlatListItemProps {
  character: Character;
}

export const CharactersListItem: React.FC<FlatListItemProps> = ({
  character,
}) => {
  const { image, name, species, status, gender } = character;

  return (
    <View style={styles.view}>
      <Image style={styles.img} source={{ uri: image }} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.secondText}>Species: {species}</Text>
        <Text style={styles.secondText}>Status: {status}</Text>
        <Text style={styles.secondText}>Gender: {gender}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  img: {
    height: 50,
    width: 50,
    marginRight: 16,
    marginVertical: 10,
  },
  secondText: {
    color: '#777',
  },
  name: {
    fontSize: 16,
  },
});
