import { routerBuilder } from '@/src/routes/routes';
import { listStyles } from '@/src/styles/listStyles';
import { Episode } from '@/src/types/episode';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface EpisodesListItemProps {
  episode: Episode;
}

export const EpisodesListItem: React.FC<EpisodesListItemProps> = ({
  episode,
}) => {
  const router = useRouter();

  const { id, name, air_date, episode: e } = episode;

  return (
    <View style={listStyles.view}>
      <View>
        <FontAwesome
          name='file-movie-o'
          size={19}
          style={styles.episodeIcon}
        />
      </View>
      <View style={styles.itemView}>
        <Text style={listStyles.name}>{name}</Text>
        <Text style={listStyles.secondText}>{e}</Text>
        <Text style={listStyles.secondText}>Air Date: {air_date}</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          onPress={() => router.navigate(routerBuilder.episode(String(id)))}
        >
          <Text style={styles.buttonText}>Get details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginLeft: 'auto',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff'
  },
  episodeIcon: {
    marginRight: 10,
    marginVertical: 9,
  },
  itemView: {
    width: 250
  }
});
