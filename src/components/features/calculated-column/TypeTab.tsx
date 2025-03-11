
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InfoIcon } from 'lucide-react';

interface TypeTabProps {
  columnId: string;
  columnName: string;
  onColumnIdChange: (value: string) => void;
  onColumnNameChange: (value: string) => void;
}

const TypeTab: React.FC<TypeTabProps> = ({
  columnId,
  columnName,
  onColumnIdChange,
  onColumnNameChange
}) => {
  return (
    <div className="grid gap-6 max-w-lg">
      <div className="space-y-2">
        <Label htmlFor="columnId">Column ID</Label>
        <Input
          id="columnId"
          value={columnId}
          onChange={(e) => onColumnIdChange(e.target.value)}
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
          onChange={(e) => onColumnNameChange(e.target.value)}
          placeholder="Enter display name for column"
          className="input-focus-animation"
        />
        <p className="text-xs text-muted-foreground">
          The display name shown in the AG-Grid column header (e.g., "Calculated Price")
        </p>
      </div>
      
      <div className="flex items-start mt-4 bg-blue-50 rounded-md p-3 border border-blue-200">
        <InfoIcon className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
        <div className="text-sm text-blue-700">
          The Column ID must be unique and will be used in the AG-Grid API. The Column Name is what users will see in the grid header.
        </div>
      </div>
    </div>
  );
};

export default TypeTab;
