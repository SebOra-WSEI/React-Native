import { linkColor, textColor } from '@/src/constants/Colors';
import { backgroundUri } from '@/src/constants/backgroudURI';
import { Link } from 'expo-router';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';

export default function TabOneScreen() {
  return (
    <ImageBackground source={backgroundUri} style={styles.image}>
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
    color: textColor,
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
