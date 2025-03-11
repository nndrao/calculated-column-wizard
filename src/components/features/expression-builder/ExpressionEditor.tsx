
import React from 'react';

interface ExpressionEditorProps {
  expression: string;
  onChange: (expression: string) => void;
}

const ExpressionEditor: React.FC<ExpressionEditorProps> = ({ expression, onChange }) => {
  return (
    <div className="flex flex-col space-y-4 p-4 h-full">
      <div>
        <textarea
          value={expression}
          onChange={(e) => onChange(e.target.value)}
          className="expression-editor w-full h-24 p-3 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent input-focus-animation resize-none"
          placeholder="Enter expression here... (e.g., if([price] > 100, 'High', 'Low'))"
        />
      </div>
      
      <div className="bg-gray-50 p-3 rounded-md border">
        <div className="text-sm font-medium mb-1">Expression Help</div>
        <p className="text-xs text-gray-600">
          Enter your calculated column expression above. You can use functions from the left panel 
          or insert field references by clicking on the field names. The expression must return a 
          value that will be displayed in the calculated column.
        </p>
      </div>
      
      {expression && (
        <div>
          <div className="text-sm font-medium mb-1">Preview</div>
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
            <code className="text-xs text-blue-800 font-mono">{expression}</code>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpressionEditor;
