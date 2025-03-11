
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
    <div className="flex-1 overflow-hidden relative">
      <ScrollArea className="h-[calc(100vh-350px)]">
        <div className="px-6 py-6">
          <TabsContent 
            value="type" 
            className="mt-0 data-[state=inactive]:hidden"
          >
            <TypeTab
              columnId={columnId}
              columnName={columnName}
              onColumnIdChange={onColumnIdChange}
              onColumnNameChange={onColumnNameChange}
            />
          </TabsContent>
          
          <TabsContent 
            value="expression" 
            className="mt-0 data-[state=inactive]:hidden"
          >
            <ExpressionTab
              expression={expression}
              onExpressionChange={onExpressionChange}
            />
          </TabsContent>
          
          <TabsContent 
            value="settings" 
            className="mt-0 data-[state=inactive]:hidden"
          >
            <SettingsTab
              settings={settings}
              onSettingsChange={onSettingsChange}
            />
          </TabsContent>
          
          <TabsContent 
            value="summary" 
            className="mt-0 data-[state=inactive]:hidden"
          >
            <SummaryTab
              columnId={columnId}
              columnName={columnName}
              expression={expression}
              settings={settings}
            />
          </TabsContent>
        </div>
      </ScrollArea>
    </div>
  );
};

export default WizardContent;
