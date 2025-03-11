
import React from 'react';
import { Code as FunctionIcon } from 'lucide-react';
import ExpressionBuilder from '../ExpressionBuilder';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ExpressionTabProps {
  expression: string;
  onExpressionChange: (expression: string) => void;
}

const EXPRESSION_EXAMPLES = [
  { label: 'Sum', example: 'row.value1 + row.value2' },
  { label: 'Multiply', example: 'row.price * row.quantity' },
  { label: 'Concatenate', example: '`${row.firstName} ${row.lastName}`' },
  { label: 'Conditional', example: 'row.age > 30 ? "Senior" : "Junior"' },
  { label: 'Format Currency', example: 'row.salary' },
  { label: 'Calculate Percentage', example: '(row.value / row.total) * 100' }
];

const ExpressionTab: React.FC<ExpressionTabProps> = ({
  expression,
  onExpressionChange
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-none mb-4">
        <h3 className="text-base font-semibold mb-1">Define Expression</h3>
        <p className="text-sm text-muted-foreground">
          Create the expression that will calculate the column value in AG-Grid
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 h-full overflow-hidden">
        <div className="overflow-hidden h-full">
          <ExpressionBuilder 
            expression={expression}
            onChange={onExpressionChange}
            className="h-full"
          />
        </div>
        
        <ScrollArea className="h-full pr-4">
          <div className="border rounded-md bg-gray-50 p-4">
            <h4 className="text-sm font-medium mb-3 flex items-center">
              <FunctionIcon className="w-4 h-4 mr-2" />
              Expression Examples
            </h4>
            
            <div className="space-y-3">
              {EXPRESSION_EXAMPLES.map((example, index) => (
                <div 
                  key={index} 
                  className="bg-white border rounded-md p-3 cursor-pointer hover:border-blue-300 transition-colors"
                  onClick={() => onExpressionChange(example.example)}
                >
                  <div className="font-medium text-sm">{example.label}</div>
                  <code className="text-xs font-mono block mt-1 text-gray-600">
                    {example.example}
                  </code>
                </div>
              ))}
            </div>
            
            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-md p-3">
              <p className="text-xs text-blue-700">
                In AG-Grid expressions, use <code className="bg-blue-100 px-1 py-0.5 rounded">row.fieldName</code> to access data from other columns. The expression will be evaluated for each row.
              </p>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default ExpressionTab;
