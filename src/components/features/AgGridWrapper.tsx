
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { 
  ColDef, 
  GridReadyEvent, 
  GridApi,
  ModuleRegistry
} from 'ag-grid-community';
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
  onGridReady?: (params: GridReadyEvent) => void;
}

const AgGridWrapper: React.FC<AgGridWrapperProps> = ({
  columnDefs: initialColumnDefs,
  rowData,
  calculatedColumns = [],
  onGridReady: externalGridReadyHandler
}) => {
  const gridRef = useRef<AgGridReact>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>(initialColumnDefs);
  const [gridApi, setGridApi] = useState<GridApi | null>(null);

  const evaluateExpression = (expression: string, row: any) => {
    try {
      let processedExpression = expression.replace(/\[(\w+)\]/g, (substring, field) => {
        if (!(field in row)) {
          console.warn(`Field [${field}] not found in row data`);
          return '0';
        }
        
        const value = row[field];
        if (value === undefined || value === null) {
          return '0';
        }
        
        return typeof value === 'number' ? String(value) : `"${value}"`;
      });

      console.log('Processed expression:', processedExpression);

      const evalFn = new Function('row', `
        try {
          return ${processedExpression};
        } catch (e) {
          console.error("Expression evaluation error:", e);
          return null;
        }
      `);

      const result = evalFn(row);
      console.log('Evaluation result:', result);
      return result;
    } catch (error) {
      console.error("Expression processing error:", error);
      return null;
    }
  };

  const createCalculatedColumnDefs = useCallback((calculatedCols) => {
    return calculatedCols.map(col => ({
      field: col.columnId,
      headerName: col.settings.header?.text || col.columnName,
      width: col.settings.width,
      editable: col.settings.editable,
      sortable: col.settings.sortable,
      filter: 'agMultiColumnFilter',
      floatingFilter: true,
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
    const calculatedColDefs = createCalculatedColumnDefs(calculatedColumns);
    setColumnDefs([...initialColumnDefs, ...calculatedColDefs]);
  }, [initialColumnDefs, calculatedColumns, createCalculatedColumnDefs]);

  const onGridReady = (params: GridReadyEvent) => {
    setGridApi(params.api);
    params.api.sizeColumnsToFit();
    
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      /* AG Grid Header Styling */
      .ag-header-cell {
        transition: background-color 0.3s, color 0.3s;
      }
      
      /* Make sure header styles are properly inherited */
      .ag-header-cell-label {
        color: inherit !important;
        background-color: inherit !important;
        font-weight: inherit !important;
        font-style: inherit !important;
        text-decoration: inherit !important;
        text-align: inherit !important;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
      }
      
      /* Ensure text in header gets the styles */
      .ag-header-cell-text {
        color: inherit !important;
      }
      
      /* Style header comp wrapper */
      .ag-header-cell-comp-wrapper {
        height: 100%;
        width: 100%;
      }
      
      /* Multi-column filter styling */
      .ag-multi-filter {
        padding: 0 !important;
      }
      
      .ag-floating-filter-body {
        height: 100%;
      }
      
      .ag-floating-filter-button {
        margin-left: 4px;
      }
      
      /* Cell hover effect */
      .ag-cell:hover {
        background-color: rgba(0, 0, 0, 0.05) !important;
      }
      
      /* Force column header styles to apply */
      .ag-header-cell, 
      .ag-header-group-cell,
      .ag-header-cell[style],
      .ag-header-group-cell[style] {
        color: inherit !important;
        background-color: inherit !important;
        font-weight: inherit !important;
        font-style: inherit !important;
        text-decoration: inherit !important;
        text-align: inherit !important;
      }
    `;
    document.head.appendChild(styleElement);
    
    // Force refresh of headers
    setTimeout(() => {
      if (params.api) {
        params.api.refreshHeader();
      }
    }, 200);
    
    if (externalGridReadyHandler) {
      externalGridReadyHandler(params);
    }
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
        suppressDragLeaveHidesColumns={true}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          sortable: true,
          filter: 'agMultiColumnFilter',
          floatingFilter: true,
          resizable: true
        }}
      />
    </div>
  );
};

export default AgGridWrapper;
