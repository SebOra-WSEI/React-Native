import { listStyles } from '@/src/styles/listStyles';
import { Episode } from '@/src/types/episode';
import React from 'react';
import { View, Text } from 'react-native';

interface EpisodesListItemProps {
  episode: Episode;
}

export const EpisodesListItem: React.FC<EpisodesListItemProps> = ({
  episode,
}) => {
  const { name, air_date, episode: e } = episode;

  return (
    <View style={listStyles.view}>
      <View>
        <Text style={listStyles.name}>
          {name} {e}
        </Text>
        <Text style={listStyles.secondText}>Air Date: {air_date}</Text>
      </View>
    </View>
  );
};
