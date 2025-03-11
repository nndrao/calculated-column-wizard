
import React from 'react';
import { Code as FunctionIcon } from 'lucide-react';
import ExpressionBuilder from './ExpressionBuilder';

interface ExpressionTabProps {
  expression: string;
  onExpressionChange: (expression: string) => void;
}

// Example of column expressions for AG-Grid
const EXPRESSION_EXAMPLES = [
  { label: 'Sum', example: '[value1] + [value2]' },
  { label: 'Multiply', example: '[price] * [quantity]' },
  { label: 'Concatenate', example: '`${[firstName]} ${[lastName]}`' },
  { label: 'Conditional', example: '[age] > 30 ? "Senior" : "Junior"' },
  { label: 'Format Currency', example: '[salary]' },
  { label: 'Calculate Percentage', example: '([value] / [total]) * 100' }
];

const ExpressionTab: React.FC<ExpressionTabProps> = ({
  expression,
  onExpressionChange
}) => {
  return (
    <>
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-1">Define Expression</h3>
        <p className="text-sm text-muted-foreground">
          Create the expression that will calculate the column value in AG-Grid
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <ExpressionBuilder 
            expression={expression}
            onChange={onExpressionChange}
          />
        </div>
        
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
              Use <code className="bg-blue-100 px-1 py-0.5 rounded">[fieldName]</code> to access data from other columns. The expression will be evaluated for each row.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpressionTab;
