import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Character } from '@/src/types/character';
import { listStyles } from '@/src/styles/listStyles';
import { useRouter } from 'expo-router';
import { routerBuilder } from '@/src/routes/routes';

interface FlatListItemProps {
  character?: Character;
}

export const CharactersListItem: React.FC<FlatListItemProps> = ({
  character,
}) => {
  const router = useRouter();

  const { id, image, name, species, status, gender, type } = character ?? {};

  return (
    <View style={listStyles.view}>
      <Image style={styles.img} source={{ uri: image }} />
      <View>
        <Text style={listStyles.name}>{name}</Text>
        <Text style={listStyles.secondText}>Species: {species}</Text>
        <Text style={listStyles.secondText}>Status: {status}</Text>
        <Text style={listStyles.secondText}>Gender: {gender}</Text>
        <Text style={listStyles.secondText}>Type: {type || '-'}</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          onPress={() => router.navigate(routerBuilder.character(String(id)))}
        >
          <Text style={styles.buttonText}>Get details</Text>
        </Pressable>
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
  buttonView: {
    marginLeft: 'auto',
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
  },
});
