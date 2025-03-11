
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Hash,
  Calendar,
  Type,
  ListTree,
  Search
} from 'lucide-react';

interface FieldSelectorProps {
  onInsertField: (fieldName: string) => void;
  availableFields?: Array<{
    name: string;
    type: string;
  }>;
}

// Default sample fields only used if availableFields is empty
const SAMPLE_FIELDS = [
  { name: 'id', type: 'number' },
  { name: 'firstName', type: 'string' },
  { name: 'lastName', type: 'string' },
  { name: 'age', type: 'number' },
  { name: 'salary', type: 'number' },
  { name: 'department', type: 'string' }
];

const FieldSelector: React.FC<FieldSelectorProps> = ({ 
  onInsertField,
  availableFields = []
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Use provided fields or fall back to sample fields
  const fieldsToDisplay = availableFields && availableFields.length > 0 
    ? availableFields 
    : SAMPLE_FIELDS;
  
  // Filter fields based on search term
  const filteredFields = fieldsToDisplay.filter(field => 
    field.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFieldIcon = (type: string) => {
    switch(type) {
      case 'number':
        return <Hash size={14} className="mr-2 text-green-600" />;
      case 'string':
        return <Type size={14} className="mr-2 text-blue-600" />;
      case 'date':
        return <Calendar size={14} className="mr-2 text-orange-600" />;
      case 'boolean':
        return <ListTree size={14} className="mr-2 text-purple-600" />;
      case 'object':
        return <ListTree size={14} className="mr-2 text-gray-600" />;
      case 'array':
        return <ListTree size={14} className="mr-2 text-indigo-600" />;
      default:
        return <Type size={14} className="mr-2 text-blue-600" />;
    }
  };

  return (
    <>
      <div className="border-b p-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search fields..." 
            className="h-8 text-sm pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="h-full p-2">
        <div className="space-y-1">
          {filteredFields.length > 0 ? (
            filteredFields.map((field) => (
              <button
                key={field.name}
                onClick={() => onInsertField(field.name)}
                className="flex items-center justify-between w-full px-2 py-1.5 text-sm hover:bg-gray-100 rounded text-left"
              >
                <div className="flex items-center">
                  {getFieldIcon(field.type)}
                  <span>{field.name}</span>
                </div>
                <span className="text-xs text-gray-500">{field.type}</span>
              </button>
            ))
          ) : (
            <div className="text-center py-4 text-sm text-gray-500">
              No fields found
            </div>
          )}
        </div>
      </ScrollArea>
    </>
  );
};

export default FieldSelector;
