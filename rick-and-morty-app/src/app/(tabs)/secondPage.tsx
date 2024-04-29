import { FlatListItem } from '@/src/components/SecondPage/FlatListItem';
import { textColor } from '@/src/constants/Colors';
import { ATTRIBUTES } from '@/src/constants/attributes';
import { backgroundUri } from '@/src/constants/backgroudURI';
import { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  StatusBar,
  ImageBackground,
} from 'react-native';

export default function SecondPage() {
  const [attribute, setAttribute] = useState<string>('');
  console.log(attribute);

  return (
    <ImageBackground source={backgroundUri} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Select attribute</Text>
        <FlatList
          style={styles.flatList}
          data={ATTRIBUTES}
          renderItem={({ item }) => (
            <FlatListItem title={item} setAttribute={setAttribute} />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 60,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: textColor,
  },
  flatList: {
    marginTop: 90,
  },
});
