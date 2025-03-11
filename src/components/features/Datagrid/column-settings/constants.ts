
import { StyleSettings, ColumnSettings } from './types';

export const defaultStyleSettings: StyleSettings = {
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  textAlign: 'left',
  backgroundColor: '#ffffff',
  color: '#000000',
  border: {
    top: { width: 1, style: 'solid', color: '#e2e8f0' },
    right: { width: 1, style: 'solid', color: '#e2e8f0' },
    bottom: { width: 1, style: 'solid', color: '#e2e8f0' },
    left: { width: 1, style: 'solid', color: '#e2e8f0' }
  }
};

export const defaultColumnSettings: ColumnSettings = {
  headerName: '',
  headerTooltip: '',
  cellTooltip: '',
  headerStyle: { ...defaultStyleSettings },
  cellStyle: { ...defaultStyleSettings },
  valueFormatter: 'default',
  customFormatter: '',
  editable: false,
  cellEditor: 'default',
  cellRenderer: 'default',
  wrapHeaderText: false,
  autoHeaderHeight: false
};
