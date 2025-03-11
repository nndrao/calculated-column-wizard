
import React, { useState } from 'react';
import Toolbar from './Toolbar';
import AgGridWrapper from '../AgGridWrapper';
import SettingsDialog from './SettingsDialog';
import { ColDef } from 'ag-grid-community';
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

  return (
    <div className="h-full flex flex-col bg-white rounded-md border shadow-sm overflow-hidden">
      <Toolbar onSettingsClick={() => setShowSettings(true)} />
      <div className="flex-1 overflow-hidden">
        <AgGridWrapper
          columnDefs={columnDefs}
          rowData={rowData}
          calculatedColumns={calculatedColumns}
        />
      </div>
      <SettingsDialog
        open={showSettings}
        onOpenChange={setShowSettings}
        calculatedColumns={calculatedColumns}
        onSaveColumn={onSaveColumn}
        onDeleteColumn={onDeleteColumn}
      />
    </div>
  );
};

export default Datagrid;
