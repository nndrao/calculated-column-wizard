
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CalculatedColumnsPanel from './CalculatedColumnsPanel';
import CalculatedColumnWizard from '../CalculatedColumnWizard';
import { ColumnSettingsType } from '../ColumnSettings';

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>Grid Settings</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="calculated-columns" className="h-full">
          <TabsList>
            <TabsTrigger value="calculated-columns">Calculated Columns</TabsTrigger>
          </TabsList>
          <TabsContent value="calculated-columns" className="h-full pt-4">
            {!showWizard ? (
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
            ) : (
              <CalculatedColumnWizard
                onSave={handleSaveColumn}
                onCancel={() => setShowWizard(false)}
                initialData={selectedColumn}
              />
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
