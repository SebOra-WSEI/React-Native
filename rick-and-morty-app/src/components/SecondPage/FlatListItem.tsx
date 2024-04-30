import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

interface FlatListItemProps {
  title: string;
}

export const FlatListItem: React.FC<FlatListItemProps> = ({
  title,
}) => {
  const displayedTitle = title[0].toUpperCase() + title.slice(1);

  return (
    <Pressable style={styles.item}>
      <Link href='/characters'>
        <Text style={styles.itemTitle}>{displayedTitle}</Text>
      </Link>
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
