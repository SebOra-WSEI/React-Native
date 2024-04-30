import {
  View,
  TextInput,
  Modal,
  Pressable,
  Text,
  StyleSheet,
} from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { CharacterGender, CharacterStatus } from '@/src/types/character';

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
}) => {
  return (
    <Modal animationType='slide' transparent visible={isModalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
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
          <Pressable
            style={styles.button}
            onPress={() => setIsModalVisible(false)}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    minWidth: 350,
    borderRadius: 20,
    padding: 35,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
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
