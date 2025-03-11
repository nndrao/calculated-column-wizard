
import React from 'react';
import { ColumnSettings } from './types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

interface GeneralTabProps {
  settings: ColumnSettings;
  setSettings: React.Dispatch<React.SetStateAction<ColumnSettings>>;
}

const GeneralTab: React.FC<GeneralTabProps> = ({ settings, setSettings }) => {
  return (
    <div className="space-y-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="headerName">Header Caption</Label>
        <Input
          id="headerName"
          value={settings.headerName}
          onChange={(e) => setSettings({ ...settings, headerName: e.target.value })}
          className="input-focus-animation"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="headerTooltip">Header Tooltip</Label>
        <Input
          id="headerTooltip"
          value={settings.headerTooltip}
          onChange={(e) => setSettings({ ...settings, headerTooltip: e.target.value })}
          className="input-focus-animation"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cellTooltip">Cell Tooltip Field</Label>
        <Input
          id="cellTooltip"
          value={settings.cellTooltip}
          onChange={(e) => setSettings({ ...settings, cellTooltip: e.target.value })}
          className="input-focus-animation"
          placeholder="Field name to use for tooltip"
        />
      </div>

      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="editable"
          checked={settings.editable}
          onCheckedChange={(checked) => 
            setSettings({ ...settings, editable: checked === true })
          }
        />
        <Label htmlFor="editable">Make column editable</Label>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="wrapHeaderText"
          checked={settings.wrapHeaderText === true}
          onCheckedChange={(checked) => 
            setSettings({ ...settings, wrapHeaderText: checked === true })
          }
        />
        <Label htmlFor="wrapHeaderText">Wrap header text</Label>
      </div>
      
      <div className="flex items-center space-x-2 mt-4">
        <Checkbox
          id="autoHeaderHeight"
          checked={settings.autoHeaderHeight === true}
          onCheckedChange={(checked) => 
            setSettings({ ...settings, autoHeaderHeight: checked === true })
          }
        />
        <Label htmlFor="autoHeaderHeight">Auto header height</Label>
      </div>
    </div>
  );
};

export default GeneralTab;
