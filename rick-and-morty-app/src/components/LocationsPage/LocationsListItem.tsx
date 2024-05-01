import { listStyles } from '@/src/styles/listStyles';
import { Location } from '@/src/types/location';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

interface LocationsListItemProps {
  location: Location;
}

export const LocationsListItem: React.FC<LocationsListItemProps> = ({
  location,
}) => {
  const router = useRouter();

  const { name, type, dimension } = location;

  return (
    <View style={listStyles.view}>
      <View>
        <FontAwesome
          name='location-arrow'
          size={15}
          style={styles.locationIcon}
        />
      </View>
      <View>
        <Text style={listStyles.name}>{name}</Text>
        <Text style={listStyles.secondText}>Type: {type}</Text>
        <Text style={listStyles.secondText}>Dimension: {dimension}</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
        // onPress={() => router.navigate(`/${id}`)}
        >
          <Text style={styles.buttonText}>Get details</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginLeft: 'auto',
    alignSelf: 'center'
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff'
  },
  locationIcon: {
    color: '#2196F3',
    marginRight: 10,
    marginVertical: 2,
  }
});

