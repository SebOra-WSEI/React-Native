import { TextInput } from 'react-native';
import React from 'react';
import { FilterModal } from '../FilterModal/FilterModal';
import { modalStyles } from '@/src/styles/modal';

interface FilterEpisodesModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  episode: string;
  setEpisodeCode: (value: string) => void;
}

export const FilterEpisodesModal: React.FC<FilterEpisodesModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  name,
  setName,
  episode,
  setEpisodeCode,
}) => (
  <FilterModal
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
  >
    <TextInput
      style={modalStyles.input}
      placeholder='Filter by name ...'
      onChangeText={(value) => setName(value)}
      defaultValue={name}
    />
    <TextInput
      style={modalStyles.input}
      placeholder='Filter by episode code ...'
      onChangeText={(value) => setEpisodeCode(value)}
      defaultValue={episode}
    />
  </FilterModal>
);
