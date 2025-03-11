
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ChevronDown, 
  Info,
  Plus,
  Minus,
  X,
  Function as FunctionIcon,
  Hash,
  Calendar,
  Type,
  Calculator,
  Sigma,
  ListTree
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ExpressionBuilderProps {
  expression: string;
  onChange: (expression: string) => void;
  className?: string;
}

interface ExpressionCategory {
  name: string;
  items: ExpressionItem[];
}

interface ExpressionItem {
  name: string;
  description: string;
  syntax: string;
  example: string;
}

const SAMPLE_CATEGORIES: ExpressionCategory[] = [
  {
    name: 'Common',
    items: [
      { 
        name: 'if', 
        description: 'Evaluate a condition and return one of two values.', 
        syntax: 'if(condition, value_if_true, value_if_false)', 
        example: 'if(A1 > 10, "High", "Low")' 
      },
      { 
        name: 'sum', 
        description: 'Add up a range of values.', 
        syntax: 'sum(value1, value2, ...)', 
        example: 'sum(A1:A10)' 
      },
      { 
        name: 'average', 
        description: 'Calculate the average of a range of values.', 
        syntax: 'average(value1, value2, ...)', 
        example: 'average(B1:B20)' 
      }
    ]
  },
  {
    name: 'Math',
    items: [
      { 
        name: 'abs', 
        description: 'Return the absolute value of a number.', 
        syntax: 'abs(number)', 
        example: 'abs(-10)' 
      },
      { 
        name: 'round', 
        description: 'Round a number to a specified number of digits.', 
        syntax: 'round(number, num_digits)', 
        example: 'round(3.14159, 2)' 
      }
    ]
  },
  {
    name: 'Text',
    items: [
      { 
        name: 'concat', 
        description: 'Combine text from multiple strings.', 
        syntax: 'concat(text1, text2, ...)', 
        example: 'concat(A1, " ", B1)' 
      },
      { 
        name: 'left', 
        description: 'Extract a substring from the left side of a string.', 
        syntax: 'left(text, num_chars)', 
        example: 'left("Hello", 2)' 
      }
    ]
  }
];

const SAMPLE_FIELDS = [
  { name: 'id', type: 'number' },
  { name: 'name', type: 'string' },
  { name: 'date', type: 'date' },
  { name: 'price', type: 'number' },
  { name: 'quantity', type: 'number' },
  { name: 'inStock', type: 'boolean' },
  { name: 'category', type: 'string' },
  { name: 'supplier', type: 'object' },
  { name: 'tags', type: 'array' }
];

const ExpressionBuilder: React.FC<ExpressionBuilderProps> = ({
  expression,
  onChange,
  className
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Common': true
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleInsertFunction = (syntax: string) => {
    onChange(`${expression}${syntax}`);
  };

  const handleInsertField = (fieldName: string) => {
    onChange(`${expression}[${fieldName}]`);
  };

  return (
    <div className={cn('flex flex-col h-full border rounded-md bg-white', className)}>
      <div className="border-b px-4 py-3 bg-gray-50 rounded-t-md">
        <h3 className="text-sm font-medium">Expression Builder</h3>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - Functions & Fields */}
        <div className="w-64 border-r overflow-hidden flex flex-col">
          <Tabs defaultValue="functions" className="flex flex-col h-full">
            <TabsList className="grid grid-cols-2 mx-2 mt-2 mb-0">
              <TabsTrigger value="functions" className="text-xs">Functions</TabsTrigger>
              <TabsTrigger value="fields" className="text-xs">Fields</TabsTrigger>
            </TabsList>
            
            <TabsContent value="functions" className="flex-1 overflow-hidden p-0 mt-0">
              <ScrollArea className="h-full p-2">
                {SAMPLE_CATEGORIES.map((category) => (
                  <div key={category.name} className="mb-2">
                    <button
                      onClick={() => toggleCategory(category.name)}
                      className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-medium hover:bg-gray-100 rounded"
                    >
                      <span>{category.name}</span>
                      {expandedCategories[category.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    
                    {expandedCategories[category.name] && (
                      <div className="ml-2 mt-1 space-y-1">
                        {category.items.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleInsertFunction(item.syntax)}
                            className="flex items-center w-full px-2 py-1 text-sm hover:bg-gray-100 rounded text-left"
                          >
                            <FunctionIcon size={14} className="mr-2 text-blue-600" />
                            <span>{item.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="fields" className="flex-1 overflow-hidden p-0 mt-0">
              <div className="border-b p-2">
                <Input placeholder="Search fields..." className="h-8 text-sm" />
              </div>
              <ScrollArea className="h-full p-2">
                <div className="space-y-1">
                  {SAMPLE_FIELDS.map((field) => (
                    <button
                      key={field.name}
                      onClick={() => handleInsertField(field.name)}
                      className="flex items-center justify-between w-full px-2 py-1.5 text-sm hover:bg-gray-100 rounded text-left"
                    >
                      <div className="flex items-center">
                        {field.type === 'number' && <Hash size={14} className="mr-2 text-green-600" />}
                        {field.type === 'string' && <Type size={14} className="mr-2 text-blue-600" />}
                        {field.type === 'date' && <Calendar size={14} className="mr-2 text-orange-600" />}
                        {field.type === 'boolean' && <ListTree size={14} className="mr-2 text-purple-600" />}
                        {field.type === 'object' && <ListTree size={14} className="mr-2 text-gray-600" />}
                        {field.type === 'array' && <ListTree size={14} className="mr-2 text-indigo-600" />}
                        <span>{field.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{field.type}</span>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Right panel - Editor */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b p-2 flex items-center justify-between bg-gray-50">
            <div className="flex items-center">
              <Calculator size={16} className="mr-2 text-blue-600" />
              <span className="text-sm font-medium">Enter Expression</span>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7">
              <Info size={14} />
            </Button>
          </div>
          
          <div className="flex-1 p-4 overflow-auto">
            <textarea
              value={expression}
              onChange={(e) => onChange(e.target.value)}
              className="expression-editor w-full h-36 min-h-[9rem] p-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent input-focus-animation"
              placeholder="Enter expression here... (e.g., if([price] > 100, 'High', 'Low'))"
            />
            
            <div className="mt-4 bg-gray-50 p-3 rounded-md border">
              <div className="text-sm font-medium mb-1">Expression Help</div>
              <p className="text-xs text-gray-600">
                Enter your calculated column expression above. You can use functions from the left panel 
                or insert field references by clicking on the field names. The expression must return a 
                value that will be displayed in the calculated column.
              </p>
            </div>
            
            {expression && (
              <div className="mt-4">
                <div className="text-sm font-medium mb-1">Preview</div>
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                  <code className="text-xs text-blue-800 font-mono">{expression}</code>
                </div>
              </div>
            )}
          </div>
          
          <div className="border-t p-3 bg-gray-50 flex justify-end space-x-2">
            <Button variant="outline" size="sm">Cancel</Button>
            <Button size="sm">Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpressionBuilder;
