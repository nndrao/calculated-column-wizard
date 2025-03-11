
import { ColDef } from 'ag-grid-community';
import { ColumnSettings, StyleSettings } from './types';

export const buildColumnDef = (settings: ColumnSettings, field: string): Partial<ColDef> => {
  const colDefUpdate: Partial<ColDef> = {
    headerName: settings.headerName,
    headerTooltip: settings.headerTooltip,
    tooltipField: settings.cellTooltip,
    editable: settings.editable
  };

  const headerStyle = {
    fontWeight: settings.headerStyle.fontWeight,
    fontStyle: settings.headerStyle.fontStyle,
    textDecoration: settings.headerStyle.textDecoration,
    textAlign: settings.headerStyle.textAlign,
    backgroundColor: settings.headerStyle.backgroundColor,
    color: settings.headerStyle.color,
    borderTop: `${settings.headerStyle.border.top.width}px ${settings.headerStyle.border.top.style} ${settings.headerStyle.border.top.color}`,
    borderRight: `${settings.headerStyle.border.right.width}px ${settings.headerStyle.border.right.style} ${settings.headerStyle.border.right.color}`,
    borderBottom: `${settings.headerStyle.border.bottom.width}px ${settings.headerStyle.border.bottom.style} ${settings.headerStyle.border.bottom.color}`,
    borderLeft: `${settings.headerStyle.border.left.width}px ${settings.headerStyle.border.left.style} ${settings.headerStyle.border.left.color}`
  };

  const cellStyle = {
    fontWeight: settings.cellStyle.fontWeight,
    fontStyle: settings.cellStyle.fontStyle,
    textDecoration: settings.cellStyle.textDecoration,
    textAlign: settings.cellStyle.textAlign,
    backgroundColor: settings.cellStyle.backgroundColor,
    color: settings.cellStyle.color,
    borderTop: `${settings.cellStyle.border.top.width}px ${settings.cellStyle.border.top.style} ${settings.cellStyle.border.top.color}`,
    borderRight: `${settings.cellStyle.border.right.width}px ${settings.cellStyle.border.right.style} ${settings.cellStyle.border.right.color}`,
    borderBottom: `${settings.cellStyle.border.bottom.width}px ${settings.cellStyle.border.bottom.style} ${settings.cellStyle.border.bottom.color}`,
    borderLeft: `${settings.cellStyle.border.left.width}px ${settings.cellStyle.border.left.style} ${settings.cellStyle.border.left.color}`
  };

  colDefUpdate.headerClass = 'custom-header';
  colDefUpdate.cellClass = 'custom-cell';
  
  colDefUpdate.cellStyle = cellStyle;
  
  colDefUpdate.headerComponentParams = {
    template: 
      `<div class="ag-header-cell-label" style="
        font-weight: ${headerStyle.fontWeight};
        font-style: ${headerStyle.fontStyle};
        text-decoration: ${headerStyle.textDecoration};
        text-align: ${headerStyle.textAlign};
        background-color: ${headerStyle.backgroundColor};
        color: ${headerStyle.color};
        border-top: ${headerStyle.borderTop};
        border-right: ${headerStyle.borderRight};
        border-bottom: ${headerStyle.borderBottom};
        border-left: ${headerStyle.borderLeft};
      "><span ref="eText" class="ag-header-cell-text"></span></div>`
  };

  addValueFormatters(settings, colDefUpdate);

  if (settings.cellEditor !== 'default') {
    colDefUpdate.cellEditor = settings.cellEditor;
  }

  if (settings.cellRenderer !== 'default') {
    colDefUpdate.cellRenderer = settings.cellRenderer;
  }

  return colDefUpdate;
};

export const addValueFormatters = (settings: ColumnSettings, colDefUpdate: Partial<ColDef>) => {
  if (settings.valueFormatter !== 'default') {
    if (settings.valueFormatter === 'number') {
      colDefUpdate.valueFormatter = (params) => {
        return new Intl.NumberFormat().format(params.value);
      };
    } else if (settings.valueFormatter === 'currency') {
      colDefUpdate.valueFormatter = (params) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value);
      };
    } else if (settings.valueFormatter === 'percentage') {
      colDefUpdate.valueFormatter = (params) => {
        return new Intl.NumberFormat('en-US', { style: 'percent' }).format(params.value / 100);
      };
    } else if (settings.valueFormatter === 'date') {
      colDefUpdate.valueFormatter = (params) => {
        return new Date(params.value).toLocaleDateString();
      };
    } else if (settings.valueFormatter === 'custom' && settings.customFormatter) {
      try {
        colDefUpdate.valueFormatter = (params) => {
          const formatterFn = new Function('value', 'data', 'column', `return ${settings.customFormatter}`);
          return formatterFn(params.value, params.data, params.column);
        };
      } catch (error) {
        console.error("Invalid custom formatter:", error);
      }
    }
  }
};
