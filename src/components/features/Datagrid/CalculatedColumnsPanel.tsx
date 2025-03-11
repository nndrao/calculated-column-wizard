
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
    <div className="w-80 bg-white border-r flex flex-col h-full">
      <div className="p-4 border-b flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-700">Calculated Columns</h3>
        <Button size="sm" onClick={onNewColumn} className="bg-primary hover:bg-primary/90 gap-1">
          <Plus className="h-3.5 w-3.5" />
          New
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        {columns.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-sm text-gray-500">No calculated columns yet</p>
          </div>
        ) : (
          <div className="p-3 space-y-2">
            {columns.map((column) => (
              <div
                key={column.columnId}
                className={cn(
                  "p-3 rounded-md border transition-all cursor-pointer",
                  selectedColumnId === column.columnId 
                    ? "border-primary/70 bg-primary/5 shadow-sm" 
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                )}
                onClick={() => onSelectColumn(column.columnId)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium text-sm">{column.columnName}</span>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full bg-transparent hover:bg-gray-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectColumn(column.columnId);
                      }}
                    >
                      <Pencil className="h-3.5 w-3.5 text-gray-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full bg-transparent hover:bg-red-50 hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteColumn(column.columnId);
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5 text-gray-500 hover:text-red-500" />
                    </Button>
                  </div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{column.columnId}</div>
                <div className="mt-2 p-2 rounded bg-gray-50 border border-gray-100">
                  <code className="text-xs block text-gray-600 whitespace-pre-wrap break-all">
                    {column.expression}
                  </code>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculatedColumnsPanel;
