
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { ColumnSettingsType } from '../ColumnSettings';
import { cn } from '@/lib/utils';

interface CalculatedColumnsPanelProps {
  columns: Array<{
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }>;
  selectedColumnId: string | null;
  onSelectColumn: (columnId: string) => void;
  onNewColumn: () => void;
  onDeleteColumn: (columnId: string) => void;
}

const CalculatedColumnsPanel: React.FC<CalculatedColumnsPanelProps> = ({
  columns,
  selectedColumnId,
  onSelectColumn,
  onNewColumn,
  onDeleteColumn,
}) => {
  return (
    <div className="flex h-full">
      <div className="w-72 border-r bg-gray-50 p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Calculated Columns</h3>
          <Button size="sm" onClick={onNewColumn}>
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
        <div className="space-y-2">
          {columns.map((column) => (
            <div
              key={column.columnId}
              className={cn(
                "p-3 rounded-md border cursor-pointer hover:bg-gray-100 transition-colors",
                selectedColumnId === column.columnId ? "border-primary bg-gray-100" : "border-gray-200"
              )}
              onClick={() => onSelectColumn(column.columnId)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{column.columnName}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteColumn(column.columnId);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
              <div className="text-xs text-gray-500 mt-1">{column.columnId}</div>
              <code className="text-xs block mt-2 text-gray-600">{column.expression}</code>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatedColumnsPanel;
