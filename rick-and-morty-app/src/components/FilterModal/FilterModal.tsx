import { View, Modal, StyleSheet } from 'react-native';
import React, { PropsWithChildren } from 'react';

interface FilterModalProps extends PropsWithChildren {
  isModalVisible: boolean;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  isModalVisible,
  children,
}) => (
  <Modal animationType='slide' transparent visible={isModalVisible}>
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        {children}
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
});
