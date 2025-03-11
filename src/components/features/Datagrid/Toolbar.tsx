
import React from 'react';
import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ToolbarProps {
  onSettingsClick: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onSettingsClick }) => {
  return (
    <div className="h-[60px] border-b flex items-center justify-end px-4 bg-white">
      <Button
        variant="ghost"
        size="icon"
        onClick={onSettingsClick}
        className="hover:bg-gray-100"
      >
        <Settings2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Toolbar;
