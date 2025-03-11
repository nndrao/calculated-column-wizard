
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus, Pencil, Trash2, Download, Upload, HelpCircle } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
  onNew?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  onNew,
  onEdit,
  onDelete,
  className,
}) => {
  return (
    <div className={cn('wizard-header flex flex-col md:flex-row md:items-center justify-between py-4 px-6 border-b', className)}>
      <div className="space-y-1 mb-4 md:mb-0">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div className="flex items-center space-x-2">
        {onNew && (
          <Button 
            variant="default" 
            size="sm" 
            onClick={onNew}
            className="h-9 px-4 shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow-md"
          >
            <Plus className="mr-2 h-4 w-4" />
            New
          </Button>
        )}
        
        {onEdit && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEdit}
            className="h-9 px-4 bg-white border-gray-200 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        )}
        
        {onDelete && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onDelete}
            className="h-9 px-4 bg-white border-gray-200 shadow-sm transition-all duration-200 hover:bg-gray-50 hover:border-gray-300"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:bg-gray-100"
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Header;
