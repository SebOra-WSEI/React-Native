import { TextInput, StyleSheet, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import { FilterModal } from '../FilterModal/FilterModal';
import { modalStyles } from '@/src/styles/modal';
import { DefaultEpisodeFilters } from '@/src/types/episode';

interface FilterEpisodesModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  episode: string;
  setEpisodeCode: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

export const FilterEpisodesModal: React.FC<FilterEpisodesModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  name,
  setName,
  episode,
  setEpisodeCode,
  setCurrentPage,
}) => {
  const [filters, setFilters] = useState<DefaultEpisodeFilters>({
    name,
    episode,
  });

  const handleOnPress = (): void => {
    setName(filters.name);
    setEpisodeCode(filters.episode);

    setCurrentPage(1);
    setIsModalVisible(false);
  };

  return (
    <FilterModal isModalVisible={isModalVisible}>
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by name ...'
        onChangeText={(value) =>
          setFilters({
            ...filters,
            name: value,
          })
        }
        defaultValue={name}
      />
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by episode code ...'
        onChangeText={(value) =>
          setFilters({
            ...filters,
            episode: value,
          })
        }
        defaultValue={episode}
      />
      <Pressable style={styles.button} onPress={handleOnPress}>
        <Text style={styles.textStyle}>Filter</Text>
      </Pressable>
    </FilterModal>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
