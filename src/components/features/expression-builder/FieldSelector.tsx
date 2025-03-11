
import React from 'react';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Hash,
  Calendar,
  Type,
  ListTree
} from 'lucide-react';

interface FieldSelectorProps {
  onInsertField: (fieldName: string) => void;
}

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

const FieldSelector: React.FC<FieldSelectorProps> = ({ onInsertField }) => {
  return (
    <>
      <div className="border-b p-2">
        <Input placeholder="Search fields..." className="h-8 text-sm" />
      </div>
      <ScrollArea className="h-full p-2">
        <div className="space-y-1">
          {SAMPLE_FIELDS.map((field) => (
            <button
              key={field.name}
              onClick={() => onInsertField(field.name)}
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
    </>
  );
};

export default FieldSelector;
