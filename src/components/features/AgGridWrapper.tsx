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

  const evaluateExpression = (expression: string, row: any) => {
    try {
      // Replace field references with proper string representation of field values
      let processedExpression = expression.replace(/\[(\w+)\]/g, (substring, field) => {
        const value = row[field];
        if (value === undefined || value === null) {
          return 'null';
        }
        // Keep numeric values as is, quote strings
        return typeof value === 'number' ? String(value) : `"${value}"`;
      });

      // Create a safe evaluation context
      const evalFn = new Function('row', `
        try {
          return ${processedExpression};
        } catch (e) {
          console.error("Expression evaluation error:", e);
          return null;
        }
      `);

      const result = evalFn(row);
      return result;
    } catch (error) {
      console.error("Expression processing error:", error);
      return null;
    }
  };

  // Function to create column definitions from calculatedColumns
  const createCalculatedColumnDefs = useCallback((calculatedCols) => {
    return calculatedCols.map(col => ({
      field: col.columnId,
      headerName: col.settings.header?.text || col.columnName,
      width: col.settings.width,
      editable: col.settings.editable,
      sortable: col.settings.sortable,
      filter: col.settings.filterable,
      resizable: col.settings.resizable,
      valueGetter: (params: any) => {
        return evaluateExpression(col.expression, params.data);
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
    }));
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
