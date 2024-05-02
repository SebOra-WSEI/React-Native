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
  episodeCode: string;
  setEpisodeCode: (value: string) => void;
  setCurrentPage: (value: number) => void;
}

export const FilterEpisodesModal: React.FC<FilterEpisodesModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  name,
  setName,
  episodeCode,
  setEpisodeCode,
  setCurrentPage,
}) => {
  const [filters, setFilters] = useState<DefaultEpisodeFilters>({
    name,
    episodeCode,
  });

  const handleOnPress = (): void => {
    setName(filters.name);
    setEpisodeCode(filters.episodeCode);

    setCurrentPage(1);
    setIsModalVisible(false);
  };

  return (
    <FilterModal isModalVisible={isModalVisible} handleOnPress={handleOnPress}>
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by name ...'
        onChangeText={(value) =>
          setFilters({
            ...filters,
            name: value,
          })
        }
        defaultValue={filters.name}
      />
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by episode code ...'
        onChangeText={(value) =>
          setFilters({
            ...filters,
            episodeCode: value,
          })
        }
        defaultValue={filters.episodeCode}
      />
    </FilterModal>
  );
};
