
import React from 'react';
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ColumnSettingsType } from '../ColumnSettings';
import TypeTab from './TypeTab';
import ExpressionTab from './ExpressionTab';
import SettingsTab from './SettingsTab';
import SummaryTab from './SummaryTab';

interface WizardContentProps {
  activeTab: string;
  columnId: string;
  columnName: string;
  expression: string;
  settings: ColumnSettingsType;
  onColumnIdChange: (value: string) => void;
  onColumnNameChange: (value: string) => void;
  onExpressionChange: (value: string) => void;
  onSettingsChange: (settings: ColumnSettingsType) => void;
}

const WizardContent: React.FC<WizardContentProps> = ({
  activeTab,
  columnId,
  columnName,
  expression,
  settings,
  onColumnIdChange,
  onColumnNameChange,
  onExpressionChange,
  onSettingsChange
}) => {
  return (
    <div className="flex-1 min-h-0 flex flex-col">
      <TabsContent 
        value="type" 
        className="flex-1 flex flex-col h-full data-[state=inactive]:hidden m-0 p-0"
      >
        <div className="p-6 pb-3 bg-white border-b">
          <h3 className="text-base font-semibold mb-1">Specify Calculated Column details</h3>
          <p className="text-sm text-muted-foreground">
            Define the basic information for your AG-Grid calculated column
          </p>
        </div>
        
        <ScrollArea className="flex-1 px-6 py-4">
          <TypeTab
            columnId={columnId}
            columnName={columnName}
            onColumnIdChange={onColumnIdChange}
            onColumnNameChange={onColumnNameChange}
          />
        </ScrollArea>
      </TabsContent>
      
      <TabsContent 
        value="expression" 
        className="flex-1 flex flex-col h-full data-[state=inactive]:hidden m-0 p-0"
      >
        <div className="p-6 pb-3 bg-white border-b">
          <h3 className="text-base font-semibold mb-1">Define Expression</h3>
          <p className="text-sm text-muted-foreground">
            Create the expression that will calculate the column value in AG-Grid
          </p>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <ExpressionTab
            expression={expression}
            onExpressionChange={onExpressionChange}
          />
        </ScrollArea>
      </TabsContent>
      
      <TabsContent 
        value="settings" 
        className="flex-1 flex flex-col h-full data-[state=inactive]:hidden m-0 p-0"
      >
        <div className="p-6 pb-3 bg-white border-b">
          <h3 className="text-base font-semibold mb-1">Column Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure how the calculated column will behave and display in AG-Grid
          </p>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <SettingsTab
            settings={settings}
            onSettingsChange={onSettingsChange}
          />
        </ScrollArea>
      </TabsContent>
      
      <TabsContent 
        value="summary" 
        className="flex-1 flex flex-col h-full data-[state=inactive]:hidden m-0 p-0"
      >
        <div className="p-6 pb-3 bg-white border-b">
          <h3 className="text-base font-semibold mb-1">Summary</h3>
          <p className="text-sm text-muted-foreground">
            Review your AG-Grid calculated column configuration
          </p>
        </div>
        
        <ScrollArea className="flex-1 p-6">
          <SummaryTab
            columnId={columnId}
            columnName={columnName}
            expression={expression}
            settings={settings}
          />
        </ScrollArea>
      </TabsContent>
    </div>
  );
};

export default WizardContent;
