import {
  View,
  Text,
  StyleSheet,
  Pressable
} from 'react-native';
import React from 'react';

interface FlatListItemProps {
  title: string;
  setAttribute: (value: string) => void;
}

export const FlatListItem: React.FC<FlatListItemProps> = ({
  title,
  setAttribute
}) => {
  const displayedTitle = title[0].toUpperCase() + title.slice(1);

  return (
    <Pressable style={styles.item} onPress={() => setAttribute(title)}>
      <Text style={styles.itemTitle}>
        {displayedTitle}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    width: 230,
    marginVertical: 16,
    backgroundColor: '#f6eee3',
    borderRadius: 20,
  },
  itemTitle: {
    fontSize: 32,
    textAlign: 'center',
  },
});
