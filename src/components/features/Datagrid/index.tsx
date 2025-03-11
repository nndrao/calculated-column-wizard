
import React, { useState } from 'react';
import Toolbar from './Toolbar';
import AgGridWrapper from '../AgGridWrapper';
import SettingsDialog from './SettingsDialog';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ColumnSettingsType } from '../ColumnSettings';

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
  columnDefs,
  rowData,
  calculatedColumns,
  onSaveColumn,
  onDeleteColumn,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [availableFields, setAvailableFields] = useState<{name: string, type: string}[]>([]);

  const handleGridReady = (params: GridReadyEvent) => {
    // Extract column information from the grid
    const fields = columnDefs.map(col => ({
      name: col.field || '',
      type: getColumnType(col)
    })).filter(field => field.name);
    
    setAvailableFields(fields);
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
      />
    </div>
  );
};

export default Datagrid;
