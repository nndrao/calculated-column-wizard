
import React from 'react';
import { Settings } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Settings className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Column</h3>
        <p className="text-gray-500 max-w-md">
          Choose a column from the list on the left to configure its settings.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
