import { View, Modal, Pressable, Text, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';

interface FilterModalProps extends PropsWithChildren {
  isModalVisible: boolean;
  setIsModalVisible: (value: boolean) => void;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isModalVisible,
  setIsModalVisible,
  children,
}) => (
  <Modal animationType='slide' transparent visible={isModalVisible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {children}
        <Pressable
          style={styles.button}
          onPress={() => setIsModalVisible(false)}
        >
          <Text style={styles.textStyle}>Filter</Text>
        </Pressable>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
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
