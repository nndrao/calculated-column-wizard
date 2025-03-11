
import React from 'react';
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import CalculatedColumnsPanel from '../CalculatedColumnsPanel';
import CalculatedColumnWizard from '../../CalculatedColumnWizard';
import { ColumnSettingsType } from '../../ColumnSettings';

interface CalculatedColumnsTabContentProps {
  showWizard: boolean;
  calculatedColumns: Array<{
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }>;
  selectedColumnId: string | null;
  onSelectColumn: (columnId: string) => void;
  onNewColumn: () => void;
  onDeleteColumn: (columnId: string) => void;
  onSaveColumn: (column: {
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }) => void;
  handleBack: () => void;
  availableFields: Array<{
    name: string;
    type: string;
  }>;
}

const CalculatedColumnsTabContent: React.FC<CalculatedColumnsTabContentProps> = ({
  showWizard,
  calculatedColumns,
  selectedColumnId,
  onSelectColumn,
  onNewColumn,
  onDeleteColumn,
  onSaveColumn,
  handleBack,
  availableFields
}) => {
  const selectedColumn = calculatedColumns.find(c => c.columnId === selectedColumnId);

  return (
    <TabsContent value="calculated-columns" className="h-full">
      {!showWizard ? (
        <div className="flex h-full overflow-hidden">
          <CalculatedColumnsPanel
            columns={calculatedColumns}
            selectedColumnId={selectedColumnId}
            onSelectColumn={onSelectColumn}
            onNewColumn={onNewColumn}
            onDeleteColumn={onDeleteColumn}
          />
          <div className="flex-1 flex items-center justify-center bg-gray-50 border-l">
            {calculatedColumns.length === 0 ? (
              <div className="text-center p-8">
                <div className="text-gray-400 mb-2 text-5xl">
                  <span className="icon">📊</span>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Calculated Columns</h3>
                <p className="text-gray-500 max-w-md mx-auto mb-4">
                  Create calculated columns to perform custom calculations on your data.
                </p>
                <Button
                  onClick={onNewColumn}
                  variant="default"
                  className="mt-2"
                >
                  Create Your First Column
                </Button>
              </div>
            ) : (
              <div className="text-center p-8">
                <div className="text-gray-400 mb-2 text-4xl">
                  <span className="icon">👈</span>
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Column</h3>
                <p className="text-gray-500 max-w-md">
                  Select a calculated column from the list to edit its properties.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="h-full flex flex-col overflow-hidden">
          <div className="bg-gray-50 border-b px-4 py-2 flex items-center flex-shrink-0">
            <Button 
              onClick={handleBack} 
              variant="ghost"
              size="sm"
              className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Columns
            </Button>
          </div>
          <div className="flex-1 overflow-hidden">
            <CalculatedColumnWizard
              onSave={onSaveColumn}
              onCancel={handleBack}
              initialData={selectedColumn}
              availableFields={availableFields}
            />
          </div>
        </div>
      )}
    </TabsContent>
  );
};

export default CalculatedColumnsTabContent;
