
import React from 'react';
import { Code as FunctionIcon } from 'lucide-react';
import ExpressionBuilder from '../ExpressionBuilder';

interface ExpressionTabProps {
  expression: string;
  onExpressionChange: (value: string) => void;
}

const EXPRESSION_EXAMPLES = [
  { label: 'Add Constant', example: '[salary] + 10000' },
  { label: 'Multiply', example: '[salary] * 1.1' },
  { label: 'Concatenate', example: '"$" + [salary]' },
  { label: 'Conditional', example: '[age] > 30 ? "Senior" : "Junior"' },
  { label: 'Calculate Percentage', example: '([salary] / 100000) * 100' },
  { label: 'Full Name', example: '[firstName] + " " + [lastName]' }
];

const ExpressionTab: React.FC<ExpressionTabProps> = ({
  expression,
  onExpressionChange
}) => {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <ExpressionBuilder 
          expression={expression}
          onChange={onExpressionChange}
          className="h-[450px]"
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
            Use square brackets to reference column fields like <code className="bg-blue-100 px-1 py-0.5 rounded">[salary]</code>. Available fields: id, firstName, lastName, age, salary, department.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExpressionTab;
