
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CalculatedColumnsPanel from './CalculatedColumnsPanel';
import CalculatedColumnWizard from '../CalculatedColumnWizard';
import ColumnSettingsTab from './ColumnSettingsTab';
import { ColumnSettingsType } from '../ColumnSettings';
import { X } from 'lucide-react';
import { ColDef } from 'ag-grid-community';

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
  availableFields: Array<{
    name: string;
    type: string;
  }>;
  columnDefs?: ColDef[];
  onUpdateColumnDef?: (field: string, colDef: Partial<ColDef>) => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  calculatedColumns,
  onSaveColumn,
  onDeleteColumn,
  availableFields,
  columnDefs = [],
  onUpdateColumnDef,
}) => {
  const [selectedColumnId, setSelectedColumnId] = useState<string | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [selectedTab, setSelectedTab] = useState('calculated-columns');

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

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDragging(false);
      return;
    }
    
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - dialogPosition.x, 
      y: e.clientY - dialogPosition.y 
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setDialogPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-5xl p-0 h-[85vh] rounded-lg overflow-hidden border border-gray-200 shadow-xl bg-white/90 backdrop-blur-sm"
        style={{ 
          transform: `translate(-50%, -50%) translate(${dialogPosition.x}px, ${dialogPosition.y}px)`,
          transition: isDragging ? 'none' : 'all 0.2s ease',
          cursor: isDragging ? 'grabbing' : 'auto'
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="flex flex-col h-full overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <DialogHeader 
            className="p-4 border-b bg-gradient-to-r from-gray-100 to-white flex-shrink-0 cursor-grab active:cursor-grabbing"
            onMouseDown={(e) => {
              e.stopPropagation();
              setIsDragging(true);
              setDragStart({ 
                x: e.clientX - dialogPosition.x, 
                y: e.clientY - dialogPosition.y 
              });
            }}
          >
            <div className="flex items-center justify-between">
              <DialogTitle className="text-xl font-semibold text-gray-800">Grid Settings</DialogTitle>
              <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
                <X className="h-4 w-4" />
              </DialogClose>
            </div>
            <p className="text-sm text-gray-500 mt-1">Configure your data grid with calculated columns and display settings</p>
          </DialogHeader>
          
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex flex-col flex-1 overflow-hidden">
            <div className="border-b bg-white flex-shrink-0">
              <TabsList className="h-10 px-4 w-full justify-start rounded-none bg-transparent">
                <TabsTrigger 
                  value="calculated-columns" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium">
                  Calculated Columns
                </TabsTrigger>
                <TabsTrigger 
                  value="column-settings" 
                  className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium">
                  Column Settings
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="calculated-columns" className="flex-1 p-0 overflow-hidden mt-0 flex flex-col">
              {!showWizard ? (
                <div className="flex h-full overflow-hidden">
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
                      onSave={handleSaveColumn}
                      onCancel={handleBack}
                      initialData={selectedColumn}
                      availableFields={availableFields}
                    />
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="column-settings" className="flex-1 p-0 overflow-hidden mt-0 flex flex-col">
              <ColumnSettingsTab 
                columnDefs={columnDefs} 
                onUpdateColumnDef={onUpdateColumnDef} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
