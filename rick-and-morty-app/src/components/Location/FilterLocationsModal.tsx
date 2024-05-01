import { TextInput, StyleSheet, Pressable, Text } from 'react-native';
import React, { useState } from 'react';
import { FilterModal } from '../FilterModal/FilterModal';
import { modalStyles } from '@/src/styles/modal';
import { DefaultLocationFilters } from '@/src/types/location';

interface FilterLocationsModalProps {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
  name: string;
  setName: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  dimension: string;
  setDimension: (value: string) => void;
  setCurrentPage: (value: number) => void;
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
  setCurrentPage
}) => {
  const [filters, setFilters] = useState<DefaultLocationFilters>({
    name,
    type,
    dimension
  });

  const handleOnPress = (): void => {
    setName(filters.name)
    setType(filters.type)
    setDimension(filters.dimension)

    setCurrentPage(1);
    setIsModalVisible(false);
  };

  return (
    <FilterModal
      isModalVisible={isModalVisible}
    >
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by name ...'
        onChangeText={(value) => setFilters({
          ...filters,
          name: value
        })}
        defaultValue={name}
      />
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by type ...'
        onChangeText={(value) => setFilters({
          ...filters,
          type: value
        })}
        defaultValue={type}
      />
      <TextInput
        style={modalStyles.input}
        placeholder='Filter by dimension ...'
        onChangeText={(value) => setFilters({
          ...filters,
          dimension: value
        })}
        defaultValue={dimension}
      />
      <Pressable
        style={styles.button}
        onPress={handleOnPress}
      >
        <Text style={styles.textStyle}>Filter</Text>
      </Pressable>
    </FilterModal>
  );
}

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

