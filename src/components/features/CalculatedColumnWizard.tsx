
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Tabs } from "@/components/ui/tabs";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { ColumnSettingsType } from './ColumnSettings';
import { DEFAULT_SETTINGS } from './calculated-column/constants';
import { useWizardValidation } from '@/hooks/use-wizard-validation';
import WizardHeader from './calculated-column/WizardHeader';
import WizardTabs from './calculated-column/WizardTabs';
import WizardContent from './calculated-column/WizardContent';
import WizardFooter from './calculated-column/WizardFooter';

interface CalculatedColumnWizardProps {
  onSave?: (data: {
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  }) => void;
  onCancel?: () => void;
  initialData?: {
    columnId: string;
    columnName: string;
    expression: string;
    settings: ColumnSettingsType;
  };
  className?: string;
  availableFields?: Array<{
    name: string;
    type: string;
  }>;
}

const CalculatedColumnWizard: React.FC<CalculatedColumnWizardProps> = ({
  onSave,
  onCancel,
  initialData,
  className,
  availableFields = []
}) => {
  const { toast } = useToast();
  const [columnId, setColumnId] = useState(initialData?.columnId || '');
  const [columnName, setColumnName] = useState(initialData?.columnName || '');
  const [expression, setExpression] = useState(initialData?.expression || '');
  const [settings, setSettings] = useState<ColumnSettingsType>(
    initialData?.settings || DEFAULT_SETTINGS
  );
  
  const {
    activeTab,
    handleTabChange,
    handleNext,
    handleBack,
    validateTypeTab
  } = useWizardValidation();

  const handleSave = () => {
    if (!validateTypeTab(columnId, columnName)) {
      return;
    }

    if (!expression) {
      toast({
        title: "Error",
        description: "Expression is required",
        variant: "destructive"
      });
      return;
    }

    onSave?.({
      columnId,
      columnName,
      expression,
      settings
    });

    toast({
      title: "Success",
      description: "Calculated column saved successfully",
    });
  };

  const handleTabChangeWrapper = (value: string) => {
    handleTabChange(value, columnId, columnName, expression);
  };

  const handleNextWrapper = () => {
    handleNext(columnId, columnName, expression);
  };

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <Card className="flex flex-col h-full overflow-hidden">
        <WizardHeader />
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChangeWrapper}
          className="flex flex-col flex-1 overflow-hidden"
        >
          <WizardTabs 
            activeTab={activeTab} 
            onTabChange={handleTabChangeWrapper} 
          />
          
          <CardContent className="flex flex-col flex-1 p-0 overflow-hidden">
            <WizardContent
              activeTab={activeTab}
              columnId={columnId}
              columnName={columnName}
              expression={expression}
              settings={settings}
              onColumnIdChange={setColumnId}
              onColumnNameChange={setColumnName}
              onExpressionChange={setExpression}
              onSettingsChange={setSettings}
              availableFields={availableFields}
            />
            
            <WizardFooter
              activeTab={activeTab}
              onBack={handleBack}
              onNext={handleNextWrapper}
              onCancel={onCancel || (() => {})}
              onSave={handleSave}
            />
          </CardContent>
        </Tabs>
      </Card>
    </div>
  );
};

export default CalculatedColumnWizard;
