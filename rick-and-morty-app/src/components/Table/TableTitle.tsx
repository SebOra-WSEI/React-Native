import React from 'react';
import { DataTable } from 'react-native-paper';

export const TableTitle: React.FC<{ title: string }> = ({ title }) => (
  <DataTable.Title style={{ justifyContent: 'center' }}>
    {title}
  </DataTable.Title>
);
