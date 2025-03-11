
import React from 'react';
import { cn } from '@/lib/utils';
import { 
  Info,
  Calculator,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import ExpressionCategories from './expression-builder/ExpressionCategories';
import FieldSelector from './expression-builder/FieldSelector';
import ExpressionEditor from './expression-builder/ExpressionEditor';

export interface ExpressionBuilderProps {
  expression: string;
  onChange: (expression: string) => void;
  className?: string;
  availableFields?: Array<{
    name: string;
    type: string;
  }>;
}

const ExpressionBuilder: React.FC<ExpressionBuilderProps> = ({
  expression,
  onChange,
  className,
  availableFields = []
}) => {
  const handleInsertFunction = (syntax: string) => {
    onChange(`${expression}${syntax}`);
  };

  const handleInsertField = (fieldName: string) => {
    onChange(`${expression}[${fieldName}]`);
  };

  return (
    <div className={cn('border rounded-md bg-white flex flex-col overflow-hidden', className)}>
      <div className="flex-none border-b px-4 py-3 bg-gray-50 rounded-t-md">
        <h3 className="text-sm font-medium">Expression Builder</h3>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 border-r flex-none">
          <Tabs defaultValue="functions" className="h-full flex flex-col">
            <TabsList className="grid grid-cols-2 mx-2 mt-2 mb-0 flex-none">
              <TabsTrigger value="functions" className="text-xs">Functions</TabsTrigger>
              <TabsTrigger value="fields" className="text-xs">Fields</TabsTrigger>
            </TabsList>
            
            <TabsContent value="functions" className="flex-1 overflow-hidden p-0 mt-0 h-full">
              <ScrollArea className="h-full p-2">
                <ExpressionCategories onInsertFunction={handleInsertFunction} />
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="fields" className="flex-1 overflow-hidden p-0 mt-0 h-full">
              <FieldSelector 
                onInsertField={handleInsertField} 
                availableFields={availableFields}
              />
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex-none border-b p-2 flex items-center justify-between bg-gray-50">
            <div className="flex items-center">
              <Calculator size={16} className="mr-2 text-blue-600" />
              <span className="text-sm font-medium">Enter Expression</span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Info size={14} />
            </Button>
          </div>
          
          <div className="flex-1 overflow-hidden">
            <ExpressionEditor 
              expression={expression} 
              onChange={onChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressionBuilder;
