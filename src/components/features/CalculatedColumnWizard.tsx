
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  TypeIcon, 
  PencilIcon, 
  SettingsIcon, 
  FileTextIcon, 
  InfoIcon 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import ExpressionBuilder from './ExpressionBuilder';
import ColumnSettings, { ColumnSettingsType } from './ColumnSettings';
import WizardSummary from './WizardSummary';
import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from '@/hooks/use-toast';

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

const DEFAULT_SETTINGS: ColumnSettingsType = {
  dataType: 'string',
  width: 150,
  editable: false,
  filterable: true,
  sortable: true,
  resizable: true,
  format: 'default',
  precision: 2,
  header: {
    text: '',
    tooltip: ''
  },
  menu: {
    enabled: true,
    items: []
  }
};

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
            Create a new calculated column based on an expression
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
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-1">Specify Calculated Column details</h3>
                <p className="text-sm text-muted-foreground">
                  Define the basic information for your calculated column
                </p>
              </div>
              
              <div className="grid gap-6 max-w-lg">
                <div className="space-y-2">
                  <Label htmlFor="columnId">Column ID</Label>
                  <Input
                    id="columnId"
                    value={columnId}
                    onChange={(e) => setColumnId(e.target.value)}
                    placeholder="Enter unique column identifier"
                    className="input-focus-animation"
                  />
                  <p className="text-xs text-muted-foreground">
                    A unique identifier for the column (e.g., "calculatedPrice")
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="columnName">Column Name</Label>
                  <Input
                    id="columnName"
                    value={columnName}
                    onChange={(e) => setColumnName(e.target.value)}
                    placeholder="Enter display name for column"
                    className="input-focus-animation"
                  />
                  <p className="text-xs text-muted-foreground">
                    The display name shown in the column header (e.g., "Calculated Price")
                  </p>
                </div>
                
                <div className="flex items-start mt-4 bg-blue-50 rounded-md p-3 border border-blue-200">
                  <InfoIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div className="text-sm text-blue-700">
                    The Column ID must be unique and will be used in the AG-Grid API. The Column Name is what users will see in the grid header.
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent 
              value="expression" 
              className="mt-0 h-full animate-fade-in data-[state=inactive]:animate-fade-out"
            >
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-1">Define Expression</h3>
                <p className="text-sm text-muted-foreground">
                  Create the expression that will calculate the column value
                </p>
              </div>
              
              <ExpressionBuilder 
                expression={expression}
                onChange={setExpression}
              />
            </TabsContent>
            
            <TabsContent 
              value="settings" 
              className="mt-0 h-full animate-fade-in data-[state=inactive]:animate-fade-out"
            >
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-1">Column Settings</h3>
                <p className="text-sm text-muted-foreground">
                  Configure how the calculated column will behave and display
                </p>
              </div>
              
              <ColumnSettings 
                settings={settings}
                onChange={setSettings}
              />
            </TabsContent>
            
            <TabsContent 
              value="summary" 
              className="mt-0 h-full animate-fade-in data-[state=inactive]:animate-fade-out"
            >
              <div className="mb-8">
                <h3 className="text-base font-semibold mb-1">Summary</h3>
                <p className="text-sm text-muted-foreground">
                  Review your calculated column configuration
                </p>
              </div>
              
              <WizardSummary 
                columnId={columnId}
                columnName={columnName}
                expression={expression}
                settings={settings}
              />
            </TabsContent>
          </CardContent>
          
          <CardFooter className="flex justify-between border-t p-4 bg-gray-50">
            <div>
              {activeTab !== 'type' && (
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  className="shadow-sm transition-all duration-200"
                >
                  Back
                </Button>
              )}
            </div>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={onCancel}
                className="shadow-sm transition-all duration-200"
              >
                Cancel
              </Button>
              {activeTab !== 'summary' ? (
                <Button 
                  onClick={handleNext}
                  className="shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow-md"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSave}
                  className="shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow-md"
                >
                  Save Column
                </Button>
              )}
            </div>
          </CardFooter>
        </Tabs>
      </Card>
    </div>
  );
};

export default CalculatedColumnWizard;
