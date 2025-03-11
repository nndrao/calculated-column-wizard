
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  LayoutGrid, 
  Columns, 
  LayoutDashboard, 
  Beaker, 
  AlertCircle, 
  Layout, 
  Calculator, 
  ChevronLeft, 
  ChevronRight,
  Zap,
  CircleHelp,
  AlertOctagon,
  Download,
  Upload,
  FileSpreadsheet,
  ArrowUpDown,
  Filter
} from 'lucide-react';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  active = false,
  onClick 
}) => {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              "flex items-center w-full px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ease-in-out group",
              active 
                ? "bg-sidebar-primary text-sidebar-primary-foreground" 
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )}
            onClick={onClick}
          >
            <Icon className={cn("h-5 w-5 mr-3 transition-colors")} />
            <span className="truncate">{label}</span>
          </button>
        </TooltipTrigger>
        <TooltipContent side="right" className="animate-slide-in">
          {label}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

interface SidebarSectionProps {
  title?: string;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ title, children }) => {
  return (
    <div className="py-2">
      {title && (
        <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-1">
          {title}
        </h3>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

interface SidebarProps {
  collapsed?: boolean;
  onToggle?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  collapsed = false,
  onToggle
}) => {
  const [activeItem, setActiveItem] = useState("calculated-column");

  const handleItemClick = (itemId: string) => {
    setActiveItem(itemId);
  };

  return (
    <div 
      className={cn(
        "wizard-sidebar h-screen bg-sidebar flex flex-col border-r border-sidebar-border",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-14 px-4 border-b border-sidebar-border">
        <h2 
          className={cn(
            "font-semibold text-sidebar-foreground transition-opacity",
            collapsed ? "opacity-0 w-0" : "opacity-100"
          )}
        >
          AG-Grid Wizard
        </h2>
        <button 
          onClick={onToggle}
          className="p-1 rounded-md text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2 px-2">
        <SidebarSection>
          <SidebarItem 
            icon={LayoutGrid} 
            label="Grid Info" 
            active={activeItem === "grid-info"}
            onClick={() => handleItemClick("grid-info")}
          />
          <SidebarItem 
            icon={Columns} 
            label="Column Info" 
            active={activeItem === "column-info"}
            onClick={() => handleItemClick("column-info")}
          />
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            active={activeItem === "dashboard"}
            onClick={() => handleItemClick("dashboard")}
          />
          <SidebarItem 
            icon={Beaker} 
            label="Test Panel" 
            active={activeItem === "test-panel"}
            onClick={() => handleItemClick("test-panel")}
          />
          <SidebarItem 
            icon={AlertCircle} 
            label="Status Bar" 
            active={activeItem === "status-bar"}
            onClick={() => handleItemClick("status-bar")}
          />
          <SidebarItem 
            icon={Layout} 
            label="Layout" 
            active={activeItem === "layout"}
            onClick={() => handleItemClick("layout")}
          />
        </SidebarSection>
        
        <SidebarSection title="Features">
          <SidebarItem 
            icon={Calculator} 
            label="Calculated Column" 
            active={activeItem === "calculated-column"}
            onClick={() => handleItemClick("calculated-column")}
          />
          <SidebarItem 
            icon={Zap} 
            label="Rule Test Engine" 
            active={activeItem === "rule-test-engine"}
            onClick={() => handleItemClick("rule-test-engine")}
          />
          <SidebarItem 
            icon={CircleHelp} 
            label="Custom Sort" 
            active={activeItem === "custom-sort"}
            onClick={() => handleItemClick("custom-sort")}
          />
          <SidebarItem 
            icon={AlertOctagon} 
            label="Alert" 
            active={activeItem === "alert"}
            onClick={() => handleItemClick("alert")}
          />
          <SidebarItem 
            icon={AlertCircle} 
            label="System Status" 
            active={activeItem === "system-status"}
            onClick={() => handleItemClick("system-status")}
          />
        </SidebarSection>

        <SidebarSection title="Data Tools">
          <SidebarItem 
            icon={Download} 
            label="Export" 
            active={activeItem === "export"}
            onClick={() => handleItemClick("export")}
          />
          <SidebarItem 
            icon={Upload} 
            label="Import Data" 
            active={activeItem === "import-data"}
            onClick={() => handleItemClick("import-data")}
          />
          <SidebarItem 
            icon={FileSpreadsheet} 
            label="Format Column" 
            active={activeItem === "format-column"}
            onClick={() => handleItemClick("format-column")}
          />
          <SidebarItem 
            icon={ArrowUpDown} 
            label="Floating Cell" 
            active={activeItem === "floating-cell"}
            onClick={() => handleItemClick("floating-cell")}
          />
          <SidebarItem 
            icon={Filter} 
            label="Filter" 
            active={activeItem === "filter"}
            onClick={() => handleItemClick("filter")}
          />
        </SidebarSection>
      </div>
    </div>
  );
};

export default Sidebar;
