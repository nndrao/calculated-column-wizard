
import React from 'react';
import { cn } from '@/lib/utils';
import { Check, AlertTriangle, Info } from 'lucide-react';
import { ColumnSettingsType } from './ColumnSettings';

interface WizardSummaryProps {
  columnId: string;
  columnName: string;
  expression: string;
  settings: ColumnSettingsType;
  className?: string;
}

const WizardSummary: React.FC<WizardSummaryProps> = ({
  columnId,
  columnName,
  expression,
  settings,
  className
}) => {
  // Simulate validation result
  const isExpressionValid = expression.length > 0;
  
  return (
    <div className={cn('border rounded-md bg-white', className)}>
      <div className="border-b px-4 py-3 bg-gray-50 rounded-t-md">
        <h3 className="text-sm font-medium">Summary</h3>
      </div>
      
      <div className="p-4">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-2">Column Information</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Column ID</div>
                <div className="font-medium">{columnId}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Column Name</div>
                <div className="font-medium">{columnName}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Expression</h4>
            <div className="bg-gray-50 border rounded-md p-3">
              <code className="text-xs font-mono">{expression || 'No expression defined'}</code>
            </div>
            <div className={cn(
              "flex items-center mt-2 text-xs", 
              isExpressionValid ? "text-green-600" : "text-amber-600"
            )}>
              {isExpressionValid ? (
                <>
                  <Check size={14} className="mr-1" />
                  <span>Expression is valid</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={14} className="mr-1" />
                  <span>Expression is empty or invalid</span>
                </>
              )}
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Settings</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <div className="text-gray-500 mb-1">Data Type</div>
                <div className="font-medium capitalize">{settings.dataType}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Format</div>
                <div className="font-medium capitalize">{settings.format}</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Width</div>
                <div className="font-medium">{settings.width}px</div>
              </div>
              <div>
                <div className="text-gray-500 mb-1">Header Text</div>
                <div className="font-medium">{settings.header?.text || columnName}</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-2">Column Properties</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full mr-2",
                  settings.editable ? "bg-green-500" : "bg-gray-300"
                )}></div>
                <span>Editable</span>
              </div>
              <div className="flex items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full mr-2",
                  settings.filterable ? "bg-green-500" : "bg-gray-300"
                )}></div>
                <span>Filterable</span>
              </div>
              <div className="flex items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full mr-2",
                  settings.sortable ? "bg-green-500" : "bg-gray-300"
                )}></div>
                <span>Sortable</span>
              </div>
              <div className="flex items-center">
                <div className={cn(
                  "w-3 h-3 rounded-full mr-2",
                  settings.resizable ? "bg-green-500" : "bg-gray-300"
                )}></div>
                <span>Resizable</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-3 flex items-start">
          <Info size={16} className="text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-blue-700">
            This calculated column will be available in your AG-Grid instance after you save it.
            The expression will be evaluated for each row in your dataset.
          </div>
        </div>
      </div>
    </div>
  );
};

export default WizardSummary;
