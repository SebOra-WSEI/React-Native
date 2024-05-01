import { TextInput, StyleSheet } from 'react-native';
import React from 'react';
import { FilterModal } from '../FilterModal/FilterModal';
import { modalStyles } from '@/src/styles/modal';

interface FilterLocationsModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  dimension: string;
  setDimension: (value: string) => void;
}

export const FilterLocationsModal: React.FC<FilterLocationsModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  name,
  setName,
  type,
  setType,
  dimension,
  setDimension,
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
      placeholder='Filter by type ...'
      onChangeText={(value) => setType(value)}
      defaultValue={type}
    />
    <TextInput
      style={modalStyles.input}
      placeholder='Filter by dimension ...'
      onChangeText={(value) => setDimension(value)}
      defaultValue={dimension}
    />
  </FilterModal>
);
