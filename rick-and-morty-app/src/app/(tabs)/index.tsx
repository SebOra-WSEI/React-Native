import { linkColor, textColor } from '@/src/constants/Colors';
import { Link } from 'expo-router';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

export default function TabOneScreen() {
  return (
    <ImageBackground source={{ uri: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.title}>Rick and Morty API application</Text>
        <View style={styles.linkView}>
          <Link href='/(tabs)/secondPage'>
            <Text style={styles.getStarted}>Get started!</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor
  },
  image: {
    flex: 1,
  },
  linkView: {
    paddingVertical: 17,
  },
  getStarted: {
    fontSize: 19,
    color: linkColor,
  },
});
