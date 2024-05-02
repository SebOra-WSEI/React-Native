import { buttonColor } from '@/src/constants/Colors';
import { routerBuilder } from '@/src/routes/routes';
import { listItemStyles } from '@/src/styles/list';
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
    <View style={listItemStyles.view}>
      <View>
        <FontAwesome name='file-movie-o' size={19} style={styles.episodeIcon} />
      </View>
      <View style={styles.itemView}>
        <Text style={listItemStyles.name}>{name}</Text>
        <Text style={listItemStyles.secondText}>{e}</Text>
        <Text style={listItemStyles.secondText}>Air Date: {air_date}</Text>
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
    backgroundColor: buttonColor,
  },
  buttonText: {
    color: '#fff',
  },
  episodeIcon: {
    marginRight: 10,
    marginVertical: 9,
  },
  itemView: {
    width: 250,
  },
});
