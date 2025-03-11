
import React from 'react';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolbarProps {
  onSettingsClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSettingsClick }) => {
  return (
    <div className="h-[60px] border-b flex items-center justify-between px-4 bg-white">
      <div className="font-medium text-gray-700">Data Grid</div>
      <Button
        variant="outline"
        size="sm"
        onClick={onSettingsClick}
        className="text-gray-700 gap-2 hover:bg-gray-50 border-gray-200"
      >
        <Settings2 className="h-4 w-4" />
        <span>Settings</span>
      </Button>
    </div>
  );
};

export default Toolbar;
