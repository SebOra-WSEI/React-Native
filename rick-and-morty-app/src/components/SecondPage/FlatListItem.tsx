import {
  View,
  Text,
  StyleSheet
} from 'react-native';

interface FlatListItemProps {
  title: string;
  setAttribute: (value: string) => void;
}

export const FlatListItem = ({ title, setAttribute }: FlatListItemProps) => {
  const displayedTitle = title[0].toUpperCase() + title.slice(1);

  return (
    <View style={styles.item}>
      <Text style={styles.itemTitle} onPress={() => setAttribute(title)}>
        {displayedTitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
    textAlign: 'center',
  },
});
