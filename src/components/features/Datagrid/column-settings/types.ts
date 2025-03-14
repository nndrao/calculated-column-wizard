
import { ColDef } from 'ag-grid-community';

export type BorderSide = 'top' | 'right' | 'bottom' | 'left';

export type StyleSettings = {
  color: string;
  backgroundColor: string;
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right';
  border: {
    [side in BorderSide]: {
      width: number;
      style: 'none' | 'solid' | 'dashed' | 'dotted';
      color: string;
    };
  };
};

export type ColumnSettings = {
  headerName: string;
  headerTooltip: string;
  cellTooltip: string;
  headerStyle: StyleSettings;
  cellStyle: StyleSettings;
  valueFormatter: 'default' | 'number' | 'currency' | 'percentage' | 'date' | 'custom';
  customFormatter: string;
  editable: boolean;
  cellEditor: string;
  cellRenderer: string;
  wrapHeaderText: boolean;
  autoHeaderHeight: boolean;
  floatingFilter?: boolean;
  filterType?: string;
};

export interface ColumnSettingsTabProps {
  columnDefs: ColDef[];
  onUpdateColumnDef: (field: string, colDef: Partial<ColDef>) => void;
}
