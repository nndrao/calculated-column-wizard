
import React from 'react';
import { 
  TypeIcon, 
  PencilIcon, 
  SettingsIcon, 
  FileTextIcon 
} from 'lucide-react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WizardTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

const WizardTabs: React.FC<WizardTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="border-b flex-none">
      <TabsList className="flex w-full justify-start rounded-none border-b border-0 p-0">
        <TabsTrigger 
          value="type" 
          onClick={() => onTabChange("type")}
          className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
        >
          <TypeIcon className="mr-2 h-4 w-4" />
          Type
        </TabsTrigger>
        <TabsTrigger 
          value="expression" 
          onClick={() => onTabChange("expression")}
          className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
        >
          <PencilIcon className="mr-2 h-4 w-4" />
          Expression
        </TabsTrigger>
        <TabsTrigger 
          value="settings" 
          onClick={() => onTabChange("settings")}
          className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
        >
          <SettingsIcon className="mr-2 h-4 w-4" />
          Settings
        </TabsTrigger>
        <TabsTrigger 
          value="summary" 
          onClick={() => onTabChange("summary")}
          className="data-[state=active]:border-primary data-[state=active]:bg-transparent rounded-none border-b-2 border-transparent px-4 py-3"
        >
          <FileTextIcon className="mr-2 h-4 w-4" />
          Summary
        </TabsTrigger>
      </TabsList>
    </div>
  );
};

export default WizardTabs;
