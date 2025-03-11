
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColDef } from 'ag-grid-community';
import { ColumnSettingsType } from '../ColumnSettings';
import ColumnSettingsTab from './ColumnSettingsTab';
import DialogHeader from './dialog/DialogHeader';
import DialogWrapper from './dialog/DialogWrapper';
import { useDialogDrag } from './hooks/useDialogDrag';
import CalculatedColumnsTabContent from './tabs/CalculatedColumnsTabContent';

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
  const [selectedTab, setSelectedTab] = useState('calculated-columns');
  const {
    dialogPosition,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    startDragging
  } = useDialogDrag();

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
    <DialogWrapper
      open={open}
      onOpenChange={onOpenChange}
      dialogPosition={dialogPosition}
      isDragging={isDragging}
      handleMouseDown={handleMouseDown}
      handleMouseMove={handleMouseMove}
      handleMouseUp={handleMouseUp}
    >
      <div className="flex flex-col h-full overflow-hidden">
        <div onMouseDown={startDragging}>
          <DialogHeader />
        </div>
        
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b bg-white flex-shrink-0">
            <TabsList className="h-10 px-4 w-full justify-start rounded-none bg-transparent">
              <TabsTrigger 
                value="calculated-columns" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium"
              >
                Calculated Columns
              </TabsTrigger>
              <TabsTrigger 
                value="column-settings" 
                className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary rounded-none border-b-2 border-transparent px-4 py-2 text-sm font-medium"
              >
                Column Settings
              </TabsTrigger>
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <CalculatedColumnsTabContent
              showWizard={showWizard}
              calculatedColumns={calculatedColumns}
              selectedColumnId={selectedColumnId}
              onSelectColumn={(columnId) => {
                setSelectedColumnId(columnId);
                setShowWizard(true);
              }}
              onNewColumn={handleNewColumn}
              onDeleteColumn={onDeleteColumn}
              onSaveColumn={handleSaveColumn}
              handleBack={handleBack}
              availableFields={availableFields}
            />
            
            <TabsContent value="column-settings" className="h-full">
              <ColumnSettingsTab 
                columnDefs={columnDefs} 
                onUpdateColumnDef={onUpdateColumnDef} 
              />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </DialogWrapper>
  );
};

export default SettingsDialog;
