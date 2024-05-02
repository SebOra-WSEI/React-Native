import { buttonColor } from '@/src/constants/Colors';
import { routerBuilder } from '@/src/routes/routes';
import { listItemStyles } from '@/src/styles/list';
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

  const { id, name, type, dimension } = location;

  return (
    <View style={listItemStyles.view}>
      <View>
        <FontAwesome
          name='location-arrow'
          size={15}
          style={styles.locationIcon}
        />
      </View>
      <View>
        <Text style={listItemStyles.name}>{name}</Text>
        <Text style={listItemStyles.secondText}>Type: {type}</Text>
        <Text style={listItemStyles.secondText}>Dimension: {dimension}</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable
          style={styles.button}
          onPress={() => router.navigate(routerBuilder.location(String(id)))}
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
    alignSelf: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    backgroundColor: buttonColor,
  },
  buttonText: {
    color: '#fff',
  },
  locationIcon: {
    color: buttonColor,
    marginRight: 10,
    marginVertical: 2,
  },
});
