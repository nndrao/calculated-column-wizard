
import React, { useState } from 'react';
import Toolbar from './Toolbar';
import AgGridWrapper from '../AgGridWrapper';
import SettingsDialog from './SettingsDialog';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { ColumnSettingsType } from '../ColumnSettings';
import { toast } from 'sonner';

interface DatagridProps {
  columnDefs: ColDef[];
  rowData: any[];
  calculatedColumns: Array<{
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }>;
  onSaveColumn: (column: {
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }) => void;
  onDeleteColumn: (columnId: string) => void;
}

const Datagrid: React.FC<DatagridProps> = ({
  columnDefs: initialColumnDefs,
  rowData,
  calculatedColumns,
  onSaveColumn,
  onDeleteColumn,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [availableFields, setAvailableFields] = useState<{name: string, type: string}[]>([]);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(initialColumnDefs);

  const handleGridReady = (params: GridReadyEvent) => {
    // Extract column information from the grid
    const fields = columnDefs.map(col => ({
      name: col.field || '',
      type: getColumnType(col)
    })).filter(field => field.name);
    
    setAvailableFields(fields);
    setGridApi(params.api);
  };
  
  // Helper function to determine column type
  const getColumnType = (colDef: ColDef): string => {
    if (colDef.type === 'numericColumn' || 
        colDef.type === 'numberColumn' || 
        colDef.field === 'age' || 
        colDef.field === 'salary' ||
        colDef.field === 'id') {
      return 'number';
    } else if (colDef.type === 'dateColumn') {
      return 'date';
    } else {
      return 'string';
    }
  };

  // Handle column definition updates from the settings dialog
  const handleUpdateColumnDef = (field: string, colDef: Partial<ColDef>) => {
    const updatedColumnDefs = columnDefs.map(col => {
      if (col.field === field) {
        return { ...col, ...colDef };
      }
      return col;
    });
    
    setColumnDefs(updatedColumnDefs);
    
    // Refresh the grid to apply changes
    if (gridApi) {
      gridApi.setColumnDefs(updatedColumnDefs);
      gridApi.refreshCells({ force: true });
    }
    
    toast.success(`Column "${field}" updated successfully`);
  };

  return (
    <div className="h-full flex flex-col bg-white rounded-md border shadow-sm overflow-hidden">
      <Toolbar onSettingsClick={() => setShowSettings(true)} />
      <div className="flex-1 overflow-hidden">
        <AgGridWrapper
          columnDefs={columnDefs}
          rowData={rowData}
          calculatedColumns={calculatedColumns}
          onGridReady={handleGridReady}
        />
      </div>
      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        calculatedColumns={calculatedColumns}
        onSaveColumn={onSaveColumn}
        onDeleteColumn={onDeleteColumn}
        availableFields={availableFields}
        columnDefs={columnDefs}
        onUpdateColumnDef={handleUpdateColumnDef}
      />
    </div>
  );
};

export default Datagrid;
