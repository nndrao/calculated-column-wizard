
import { ColDef } from 'ag-grid-community';

export type BorderSide = 'top' | 'right' | 'bottom' | 'left';

export interface StyleSettings {
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right';
  backgroundColor: string;
  color: string;
  border: {
    [key in BorderSide]: {
      width: number;
      style: 'none' | 'solid' | 'dashed' | 'dotted';
      color: string;
    };
  };
}

export interface ColumnSettings {
  headerName: string;
  headerTooltip: string;
  cellTooltip: string;
  headerStyle: StyleSettings;
  cellStyle: StyleSettings;
  valueFormatter: string;
  customFormatter: string;
  editable: boolean;
  cellEditor: string;
  cellRenderer: string;
}

export interface ColumnSettingsTabProps {
  columnDefs: ColDef[];
  onUpdateColumnDef?: (field: string, colDef: Partial<ColDef>) => void;
}
