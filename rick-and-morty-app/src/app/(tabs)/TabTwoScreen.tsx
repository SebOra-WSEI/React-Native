import { useState } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, StatusBar } from 'react-native';

const attributes = [
  'character',
  'location',
  'episode',
];

interface ItemProps {
  title: string
  setAttribute: (value: string) => void
}

const Item = ({
  title,
  setAttribute
}: ItemProps) => {
  const displayedTitle = title[0].toUpperCase() + title.slice(1)

  return (
    <View style={styles.item}>
      <Text
        style={styles.itemTitle}
        onPress={() => setAttribute(title)}
      >
        {displayedTitle}
      </Text>
    </View>
  );
}

export default function TabTwoScreen() {
  const [attribute, setAttribute] = useState<string>('');
  console.log(attribute)


  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Select attribute</Text>
      <FlatList
        style={styles.flatList}
        data={attributes}
        renderItem={({ item }) => <Item title={item} setAttribute={setAttribute} />}
        keyExtractor={item => item}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: StatusBar.currentHeight || 100,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  item: {
    padding: 20,
    width: 230,
    marginVertical: 8,
    backgroundColor: '#f6eee3',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,

  },
  itemTitle: {
    fontSize: 32,
    textAlign: 'center'
  },
  flatList: {
    marginTop: 40
  }
});