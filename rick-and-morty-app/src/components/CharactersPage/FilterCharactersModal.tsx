import {
  TextInput,
  StyleSheet,
} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { CharacterGender, CharacterStatus } from '@/src/types/character';
import { FilterModal } from '../FilterModal/FIlterModal';

interface FilterCharactersModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  setStatus: (value: CharacterStatus | undefined) => void;
  setGender: (value: CharacterGender | undefined) => void;
  name: string;
  setName: (value: string) => void;
  species: string;
  setSpecies: (value: string) => void;
  type: string;
  setType: (value: string) => void;
}

export const FilterCharactersModal: React.FC<FilterCharactersModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  setStatus,
  setGender,
  name,
  setName,
  species,
  setSpecies,
  type,
  setType,
}) => (
  <FilterModal
    isModalVisible={isModalVisible}
    setIsModalVisible={setIsModalVisible}
  >
    <RNPickerSelect
      style={pickerSelectStyles}
      onValueChange={(value) => setStatus(value)}
      items={Object.entries(CharacterStatus).map(([label, value]) => ({
        label,
        value,
      }))}
      placeholder={{ label: 'Filter by status ...' }}
    />
    <RNPickerSelect
      style={pickerSelectStyles}
      onValueChange={(value) => setGender(value)}
      items={Object.entries(CharacterGender).map(([label, value]) => ({
        label,
        value,
      }))}
      placeholder={{ label: 'Filter by gender ...' }}
    />
    <TextInput
      style={styles.input}
      placeholder='Filter by name ...'
      onChangeText={(value) => setName(value)}
      defaultValue={name}
    />
    <TextInput
      style={styles.input}
      placeholder='Filter by species ...'
      onChangeText={(value) => setSpecies(value)}
      defaultValue={species}
    />
    <TextInput
      style={styles.input}
      placeholder='Filter by type ...'
      onChangeText={(value) => setType(value)}
      defaultValue={type}
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    textAlign: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 10,
    marginVertical: 5,
    fontSize: 14,
    borderColor: '#777',
  },
});
