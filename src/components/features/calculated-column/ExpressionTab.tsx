
import React from 'react';
import { Code as FunctionIcon } from 'lucide-react';
import ExpressionBuilder from '../ExpressionBuilder';

interface ExpressionTabProps {
  expression: string;
  onExpressionChange: (expression: string) => void;
}

// Example of column expressions for AG-Grid
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
    <div className="h-full flex flex-col">
      <div className="mb-4">
        <h3 className="text-base font-semibold mb-1">Define Expression</h3>
        <p className="text-sm text-muted-foreground">
          Create the expression that will calculate the column value in AG-Grid
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 flex-1 min-h-0">
        <div className="flex flex-col">
          <ExpressionBuilder 
            expression={expression}
            onChange={onExpressionChange}
            className="flex-1 min-h-0"
          />
        </div>
        
        <div className="border rounded-md bg-gray-50 p-4 overflow-auto">
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
      </div>
    </div>
  );
};

export default ExpressionTab;
