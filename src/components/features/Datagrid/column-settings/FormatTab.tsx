
import React from 'react';
import { ColumnSettings } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Code } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

interface FormatTabProps {
  settings: ColumnSettings;
  setSettings: React.Dispatch<React.SetStateAction<ColumnSettings>>;
}

const FormatTab: React.FC<FormatTabProps> = ({ settings, setSettings }) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="valueFormatter">Value Formatter</Label>
        <Select
          value={settings.valueFormatter}
          onValueChange={(value) => setSettings({ ...settings, valueFormatter: value })}
        >
          <SelectTrigger id="valueFormatter" className="w-full">
            <SelectValue placeholder="Select value formatter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="currency">Currency</SelectItem>
            <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="custom">Custom (Excel-like)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {settings.valueFormatter === 'custom' && (
        <div className="space-y-2">
          <Label htmlFor="customFormatter">Custom Formatter (Excel-like)</Label>
          <div className="flex items-center border border-input p-2 rounded-md bg-muted/30">
            <Code size={16} className="mr-2 text-gray-500" />
            <Input
              id="customFormatter"
              value={settings.customFormatter}
              onChange={(e) => setSettings({ ...settings, customFormatter: e.target.value })}
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              placeholder="e.g., value.toFixed(2) + ' units'"
            />
          </div>
          <p className="text-xs text-gray-500">
            Use 'value' to refer to the cell value, 'data' for the entire row data, and 'column' for column info.
          </p>
        </div>
      )}

      <div className="space-y-2 pt-4">
        <Label htmlFor="cellEditor">Cell Editor</Label>
        <Select
          value={settings.cellEditor}
          onValueChange={(value) => setSettings({ ...settings, cellEditor: value })}
        >
          <SelectTrigger id="cellEditor">
            <SelectValue placeholder="Select cell editor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="agTextCellEditor">Text Editor</SelectItem>
            <SelectItem value="agLargeTextCellEditor">Large Text Editor</SelectItem>
            <SelectItem value="agSelectCellEditor">Select Editor</SelectItem>
            <SelectItem value="agNumberCellEditor">Number Editor</SelectItem>
            <SelectItem value="agDateCellEditor">Date Editor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2 pt-4">
        <Label htmlFor="cellRenderer">Cell Renderer</Label>
        <Select
          value={settings.cellRenderer}
          onValueChange={(value) => setSettings({ ...settings, cellRenderer: value })}
        >
          <SelectTrigger id="cellRenderer">
            <SelectValue placeholder="Select cell renderer" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="agAnimateShowChangeCellRenderer">Animate Show Change</SelectItem>
            <SelectItem value="agAnimateSlideCellRenderer">Animate Slide</SelectItem>
            <SelectItem value="agGroupCellRenderer">Group Cell</SelectItem>
            <SelectItem value="agSparklineCellRenderer">Sparkline</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 pt-4">
        <Switch
          id="floatingFilter"
          checked={settings.floatingFilter ?? true}
          onCheckedChange={(checked) => 
            setSettings({ ...settings, floatingFilter: checked })
          }
        />
        <Label htmlFor="floatingFilter">Enable Floating Filter</Label>
      </div>

      <div className="pt-4">
        <Label>Filter Type</Label>
        <Select
          value={settings.filterType || 'agMultiColumnFilter'}
          onValueChange={(value) => setSettings({ ...settings, filterType: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select filter type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="agMultiColumnFilter">Multi Column Filter</SelectItem>
            <SelectItem value="agTextColumnFilter">Text Filter</SelectItem>
            <SelectItem value="agNumberColumnFilter">Number Filter</SelectItem>
            <SelectItem value="agDateColumnFilter">Date Filter</SelectItem>
            <SelectItem value="agSetColumnFilter">Set Filter</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default FormatTab;
