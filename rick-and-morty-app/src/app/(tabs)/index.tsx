import { Link } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rick and Morty API application</Text>
      <View style={styles.linkView}>
        <Link href='/(tabs)/TabTwoScreen'>
          <Text style={styles.getStarted}>Get started!</Text>
        </Link>
      </View>
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linkView: {
    paddingVertical: 15,
  },
  getStarted: {
    fontSize: 18,
    color: '#00b4d8'
  }
});
