import { Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { ViewType } from '@/src/types/view';

interface ViewsListProps {
  view: ViewType;
}

export const ViewsList: React.FC<ViewsListProps> = ({ view }) => {
  const displayedTitle = view[0].toUpperCase() + view.slice(1);

  return (
    <Pressable style={styles.item}>
      <Link href={`/${view}`}>
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
