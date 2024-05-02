import { TextInput, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import RNPickerSelect from 'react-native-picker-select';
import {
  CharacterGender,
  CharacterStatus,
  DefaultCharacterFilters,
} from '@/src/types/character';
import { modalStyles } from '@/src/styles/modal';
import { FilterModal } from '../FilterModal/FilterModal';

interface FilterCharactersModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  setStatus: (value: CharacterStatus | undefined) => void;
  status: CharacterStatus | undefined;
  setGender: (value: CharacterGender | undefined) => void;
  gender: CharacterGender | undefined;
  setName: (value: string) => void;
  name: string;
  setSpecies: (value: string) => void;
  species: string;
  setType: (value: string) => void;
  type: string;
  setCurrentPage: (value: number) => void;
}

export const FilterCharactersModal: React.FC<FilterCharactersModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  setStatus,
  status,
  setGender,
  gender,
  setName,
  name,
  setSpecies,
  species,
  setType,
  type,
  setCurrentPage,
}) => {
  const [filters, setFilters] = useState<DefaultCharacterFilters>({
    name,
    gender,
    status,
    species,
    type,
  });

  const handleOnPress = (): void => {
    setGender(filters.gender);
    setStatus(filters.status);
    setName(filters.name);
    setSpecies(filters.species);
    setType(filters.type);

    setCurrentPage(1);
    setIsModalVisible(false);
  };

  return (
    <FilterModal isModalVisible={isModalVisible} handleOnPress={handleOnPress}>
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) =>
          setFilters({
            ...filters,
            status: value,
          })
        }
        items={Object.entries(CharacterStatus).map(([label, value]) => ({
          label,
          value,
        }))}
        placeholder={{ label: 'Filter by status ...' }}
        value={filters.status}
      />
      <RNPickerSelect
        style={pickerSelectStyles}
        onValueChange={(value) =>
          setFilters({
            ...filters,
            gender: value,
          })
        }
        items={Object.entries(CharacterGender).map(([label, value]) => ({
          label,
          value,
        }))}
        placeholder={{ label: 'Filter by gender ...' }}
        value={filters.gender}
      />
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
        placeholder='Filter by species ...'
        onChangeText={(value) =>
          setFilters({
            ...filters,
            species: value,
          })
        }
        defaultValue={filters.species}
      />
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by type ...'
        onChangeText={(value) =>
          setFilters({
            ...filters,
            type: value,
          })
        }
        defaultValue={filters.type}
      />
    </FilterModal>
  );
};

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
