
import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronDown,
  Code as FunctionIcon
} from 'lucide-react';

interface ExpressionCategoriesProps {
  onInsertFunction: (syntax: string) => void;
}

interface ExpressionCategory {
  name: string;
  items: ExpressionItem[];
}

interface ExpressionItem {
  name: string;
  description: string;
  syntax: string;
  example: string;
}

const SAMPLE_CATEGORIES: ExpressionCategory[] = [
  {
    name: 'Common',
    items: [
      { 
        name: 'if', 
        description: 'Evaluate a condition and return one of two values.', 
        syntax: 'if(condition, value_if_true, value_if_false)', 
        example: 'if(A1 > 10, "High", "Low")' 
      },
      { 
        name: 'sum', 
        description: 'Add up a range of values.', 
        syntax: 'sum(value1, value2, ...)', 
        example: 'sum(A1:A10)' 
      },
      { 
        name: 'average', 
        description: 'Calculate the average of a range of values.', 
        syntax: 'average(value1, value2, ...)', 
        example: 'average(B1:B20)' 
      }
    ]
  },
  {
    name: 'Math',
    items: [
      { 
        name: 'abs', 
        description: 'Return the absolute value of a number.', 
        syntax: 'abs(number)', 
        example: 'abs(-10)' 
      },
      { 
        name: 'round', 
        description: 'Round a number to a specified number of digits.', 
        syntax: 'round(number, num_digits)', 
        example: 'round(3.14159, 2)' 
      }
    ]
  },
  {
    name: 'Text',
    items: [
      { 
        name: 'concat', 
        description: 'Combine text from multiple strings.', 
        syntax: 'concat(text1, text2, ...)', 
        example: 'concat(A1, " ", B1)' 
      },
      { 
        name: 'left', 
        description: 'Extract a substring from the left side of a string.', 
        syntax: 'left(text, num_chars)', 
        example: 'left("Hello", 2)' 
      }
    ]
  }
];

const ExpressionCategories: React.FC<ExpressionCategoriesProps> = ({ onInsertFunction }) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Common': true
  });

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <>
      {SAMPLE_CATEGORIES.map((category) => (
        <div key={category.name} className="mb-2">
          <button
            onClick={() => toggleCategory(category.name)}
            className="flex items-center justify-between w-full px-2 py-1.5 text-sm font-medium hover:bg-gray-100 rounded"
          >
            <span>{category.name}</span>
            {expandedCategories[category.name] ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </button>
          
          {expandedCategories[category.name] && (
            <div className="ml-2 mt-1 space-y-1">
              {category.items.map((item) => (
                <button
                  key={item.name}
                  onClick={() => onInsertFunction(item.syntax)}
                  className="flex items-center w-full px-2 py-1 text-sm hover:bg-gray-100 rounded text-left"
                >
                  <FunctionIcon size={14} className="mr-2 text-blue-600" />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ExpressionCategories;
