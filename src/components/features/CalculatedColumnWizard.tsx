
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  TypeIcon, 
  PencilIcon, 
  SettingsIcon, 
  FileTextIcon 
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';
import { ColumnSettingsType } from './ColumnSettings';
import { DEFAULT_SETTINGS } from './calculated-column/constants';
import TypeTab from './calculated-column/TypeTab';
import ExpressionTab from './calculated-column/ExpressionTab';
import SettingsTab from './calculated-column/SettingsTab';
import SummaryTab from './calculated-column/SummaryTab';
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
}

const CalculatedColumnWizard: React.FC<CalculatedColumnWizardProps> = ({
  onSave,
  onCancel,
  initialData,
  className
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('type');
  const [columnId, setColumnId] = useState(initialData?.columnId || '');
  const [columnName, setColumnName] = useState(initialData?.columnName || '');
  const [expression, setExpression] = useState(initialData?.expression || '');
  const [settings, setSettings] = useState<ColumnSettingsType>(
    initialData?.settings || DEFAULT_SETTINGS
  );

  const handleSave = () => {
    if (!columnId) {
      toast({
        title: "Error",
        description: "Column ID is required",
        variant: "destructive"
      });
      setActiveTab('type');
      return;
    }

    if (!columnName) {
      toast({
        title: "Error",
        description: "Column Name is required",
        variant: "destructive"
      });
      setActiveTab('type');
      return;
    }

    if (!expression) {
      toast({
        title: "Error",
        description: "Expression is required",
        variant: "destructive"
      });
      setActiveTab('expression');
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

  const handleNext = () => {
    if (activeTab === 'type') {
      if (!columnId || !columnName) {
        toast({
          title: "Error",
          description: "Column ID and Name are required",
          variant: "destructive"
        });
        return;
      }
      setActiveTab('expression');
    } else if (activeTab === 'expression') {
      if (!expression) {
        toast({
          title: "Error",
          description: "Expression is required",
          variant: "destructive"
        });
        return;
      }
      setActiveTab('settings');
    } else if (activeTab === 'settings') {
      setActiveTab('summary');
    }
  };

  const handleBack = () => {
    if (activeTab === 'expression') {
      setActiveTab('type');
    } else if (activeTab === 'settings') {
      setActiveTab('expression');
    } else if (activeTab === 'summary') {
      setActiveTab('settings');
    }
  };

  const handleTabChange = (value: string) => {
    if (value === 'expression' && (!columnId || !columnName)) {
      toast({
        title: "Error",
        description: "Please fill in the column details first",
        variant: "destructive"
      });
      return;
    }
    
    if (value === 'settings' && !expression) {
      toast({
        title: "Error",
        description: "Please define an expression first",
        variant: "destructive"
      });
      return;
    }
    
    setActiveTab(value);
  };

  return (
    <div className={cn('wizard-container flex flex-col h-full', className)}>
      <Card className="flex-1 shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="bg-gray-50 border-b pb-3 pt-4">
          <CardTitle className="text-lg font-medium">Calculated Column Wizard</CardTitle>
          <CardDescription>
            Create a new calculated column based on an expression for AG-Grid
          </CardDescription>
        </CardHeader>
        
        <Tabs 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="flex-1 flex flex-col"
        >
          <div className="border-b">
            <TabsList className="flex w-full justify-start rounded-none border-b border-0 p-0">
              <TabsTrigger 
                value="type" 
                className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
              >
                <TypeIcon className="mr-2 h-4 w-4" />
                Type
              </TabsTrigger>
              <TabsTrigger 
                value="expression" 
                className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
              >
                <PencilIcon className="mr-2 h-4 w-4" />
                Expression
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
              >
                <SettingsIcon className="mr-2 h-4 w-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger 
                value="summary" 
                className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
              >
                <FileTextIcon className="mr-2 h-4 w-4" />
                Summary
              </TabsTrigger>
            </TabsList>
          </div>
          
          <CardContent className="flex-1 overflow-auto p-6">
            <TabsContent 
              value="type" 
              className="mt-0 h-full space-y-6 animate-fade-in data-[state=inactive]:animate-fade-out"
            >
              <TypeTab
                columnId={columnId}
                columnName={columnName}
                onColumnIdChange={setColumnId}
                onColumnNameChange={setColumnName}
              />
            </TabsContent>
            
            <TabsContent 
              value="expression" 
              className="mt-0 h-full animate-fade-in data-[state=inactive]:animate-fade-out"
            >
              <ExpressionTab
                expression={expression}
                onExpressionChange={setExpression}
              />
            </TabsContent>
            
            <TabsContent 
              value="settings" 
              className="mt-0 h-full animate-fade-in data-[state=inactive]:animate-fade-out"
            >
              <SettingsTab
                settings={settings}
                onSettingsChange={setSettings}
              />
            </TabsContent>
            
            <TabsContent 
              value="summary" 
              className="mt-0 h-full animate-fade-in data-[state=inactive]:animate-fade-out"
            >
              <SummaryTab
                columnId={columnId}
                columnName={columnName}
                expression={expression}
                settings={settings}
              />
            </TabsContent>
          </CardContent>
          
          <CardFooter className="p-0">
            <WizardFooter
              activeTab={activeTab}
              onBack={handleBack}
              onNext={handleNext}
              onCancel={onCancel || (() => {})}
              onSave={handleSave}
            />
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
};

export default CalculatedColumnWizard;
