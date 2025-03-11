
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ColDef, GridReadyEvent, GridApi } from 'ag-grid-community';
import { ColumnSettingsType } from './ColumnSettings';

interface AgGridWrapperProps {
  columnDefs: ColDef[];
  rowData: any[];
  calculatedColumns?: {
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }[];
}

const AgGridWrapper: React.FC<AgGridWrapperProps> = ({
  columnDefs: initialColumnDefs,
  rowData,
  calculatedColumns = []
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(initialColumnDefs);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  // Function to create column definitions from calculatedColumns
  const createCalculatedColumnDefs = useCallback((calculatedCols) => {
    return calculatedCols.map(col => {
      return {
        field: col.columnId,
        headerName: col.settings.header?.text || col.columnName,
        width: col.settings.width,
        editable: col.settings.editable,
        sortable: col.settings.sortable,
        filter: col.settings.filterable,
        resizable: col.settings.resizable,
        valueGetter: (params: any) => {
          try {
            // This is a simple implementation - in production you would use a safer approach
            // Using Function constructor is generally not recommended for security reasons
            // Consider using a proper expression parser library
            const row = params.data;
            // eslint-disable-next-line no-new-func
            const evalFn = new Function('row', `return ${col.expression}`);
            return evalFn(row);
          } catch (error) {
            console.error(`Error evaluating expression for ${col.columnId}:`, error);
            return 'Error';
          }
        },
        valueFormatter: (params: any) => {
          if (params.value === null || params.value === undefined) return '';
          
          if (col.settings.format === 'currency') {
            return new Intl.NumberFormat('en-US', { 
              style: 'currency', 
              currency: 'USD',
              minimumFractionDigits: col.settings.precision || 2
            }).format(params.value);
          } else if (col.settings.format === 'number') {
            return new Intl.NumberFormat('en-US', {
              minimumFractionDigits: col.settings.precision || 2,
              maximumFractionDigits: col.settings.precision || 2
            }).format(params.value);
          } else if (col.settings.format === 'percentage') {
            return new Intl.NumberFormat('en-US', {
              style: 'percent',
              minimumFractionDigits: col.settings.precision || 2
            }).format(params.value / 100);
          } else if (col.settings.format === 'date' && params.value instanceof Date) {
            return new Intl.DateTimeFormat('en-US').format(params.value);
          }
          
          return params.value;
        }
      } as ColDef;
    });
  }, []);

  useEffect(() => {
    // Combine original column defs with calculated columns
    const calculatedColDefs = createCalculatedColumnDefs(calculatedColumns);
    setColumnDefs([...initialColumnDefs, ...calculatedColDefs]);
  }, [initialColumnDefs, calculatedColumns, createCalculatedColumnDefs]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
  };

  return (
    <div className="ag-theme-alpine w-full h-[500px]">
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        onGridReady={onGridReady}
        animateRows={true}
        rowSelection="multiple"
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          sortable: true,
          filter: true,
          resizable: true
        }}
      />
    </div>
  );
};

export default AgGridWrapper;
