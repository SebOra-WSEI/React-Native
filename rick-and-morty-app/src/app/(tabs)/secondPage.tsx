import { FlatListItem } from '@/src/components/SecondPage/FlatListItem';
import { textColor } from '@/src/constants/Colors';
import { ATTRIBUTES } from '@/src/constants/attributes';
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
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=2158&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      }}
      style={styles.image}
    >
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
