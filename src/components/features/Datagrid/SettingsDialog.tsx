
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculatedColumnsPanel from './CalculatedColumnsPanel';
import CalculatedColumnWizard from '../CalculatedColumnWizard';
import { ColumnSettingsType } from '../ColumnSettings';
import { X } from 'lucide-react';

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  calculatedColumns,
  onSaveColumn,
  onDeleteColumn,
}) => {
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  const selectedColumn = calculatedColumns.find(c => c.columnId === selectedColumnId);

  const handleNewColumn = () => {
    setSelectedColumnId(null);
    setShowWizard(true);
  };

  const handleSaveColumn = (column: {
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }) => {
    onSaveColumn(column);
    setShowWizard(false);
    setSelectedColumnId(null);
  };

  const handleBack = () => {
    setShowWizard(false);
    setSelectedColumnId(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl p-0 h-[85vh] rounded-lg overflow-hidden border border-gray-200 shadow-xl">
        <DialogHeader className="p-6 border-b space-y-1 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-800">Grid Settings</DialogTitle>
            <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
          <p className="text-sm text-gray-500">Configure your data grid with calculated columns and display settings</p>
        </DialogHeader>
        
        <Tabs defaultValue="calculated-columns" className="flex flex-col h-full">
          <div className="border-b bg-white">
            <TabsList className="h-12 px-6 w-full justify-start rounded-none bg-transparent">
              <TabsTrigger 
                value="calculated-columns" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium">
                Calculated Columns
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="calculated-columns" className="flex-1 p-0 overflow-hidden">
            {!showWizard ? (
              <div className="flex h-full">
                <CalculatedColumnsPanel
                  columns={calculatedColumns}
                  selectedColumnId={selectedColumnId}
                  onSelectColumn={(columnId) => {
                    setSelectedColumnId(columnId);
                    setShowWizard(true);
                  }}
                  onNewColumn={handleNewColumn}
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
                        onClick={handleNewColumn}
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
              <div className="h-full flex flex-col">
                <div className="bg-gray-50 border-b px-6 py-2 flex items-center">
                  <button 
                    onClick={handleBack} 
                    className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                    Back to Columns
                  </button>
                </div>
                <div className="flex-1 overflow-auto p-6">
                  <CalculatedColumnWizard
                    onSave={handleSaveColumn}
                    onCancel={handleBack}
                    initialData={selectedColumn}
                  />
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
