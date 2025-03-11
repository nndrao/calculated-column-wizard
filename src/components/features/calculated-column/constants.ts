
import { ColumnSettingsType } from '../ColumnSettings';

export const DEFAULT_SETTINGS: ColumnSettingsType = {
  dataType: 'string',
  width: 150,
  editable: false,
  filterable: true,
  sortable: true,
  resizable: true,
  format: 'default',
  precision: 2,
  header: {
    text: '',
    tooltip: ''
  },
  menu: {
    enabled: true,
    items: []
  }
};
