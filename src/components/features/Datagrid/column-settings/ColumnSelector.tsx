
import React from 'react';
import { ColDef } from 'ag-grid-community';

interface ColumnSelectorProps {
  columnDefs: ColDef[];
  selectedField: string | null;
  setSelectedField: (field: string | null) => void;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({ 
  columnDefs,
  selectedField,
  setSelectedField
}) => {
  return (
    <div className="w-60 border-r h-full overflow-y-auto bg-gray-50 p-4">
      <h3 className="font-medium text-sm mb-3">Available Columns</h3>
      <div className="space-y-1">
        {columnDefs.length === 0 ? (
          <div className="px-3 py-2 text-sm text-gray-500">No columns available</div>
        ) : (
          columnDefs.map((col) => (
            <div
              key={col.field}
              className={`px-3 py-2 rounded text-sm cursor-pointer ${
                selectedField === col.field
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => setSelectedField(col.field || null)}
            >
              {col.headerName || col.field}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ColumnSelector;
