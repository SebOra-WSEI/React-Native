import {
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import { FilterModal } from '../FilterModal/FIlterModal';

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
  setDimension
}) => (
  <FilterModal
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
  >
    <TextInput
      style={styles.input}
      placeholder='Filter by name ...'
      onChangeText={(value) => setName(value)}
      defaultValue={name}
    />
    <TextInput
      style={styles.input}
      placeholder='Filter by type ...'
      onChangeText={(value) => setType(value)}
      defaultValue={type}
    />
    <TextInput
      style={styles.input}
      placeholder='Filter by dimension ...'
      onChangeText={(value) => setDimension(value)}
      defaultValue={dimension}
    />
  </FilterModal>
);

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 14,
    borderColor: '#777',
  },
});