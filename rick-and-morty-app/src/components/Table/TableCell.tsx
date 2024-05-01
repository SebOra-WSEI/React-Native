import React from 'react';
import { DataTable } from 'react-native-paper';

export const TableCell: React.FC<{ value?: string }> = ({ value }) => (
  <DataTable.Cell style={{ justifyContent: 'center' }}>
    {value || '-'}
  </DataTable.Cell>
);
