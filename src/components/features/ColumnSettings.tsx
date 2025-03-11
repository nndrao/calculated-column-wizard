
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  RadioGroup, 
  RadioGroupItem 
} from '@/components/ui/radio-group';
import { 
  Checkbox 
} from '@/components/ui/checkbox';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  Label 
} from '@/components/ui/label';
import { 
  Input 
} from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ColumnSettingsProps {
  settings: ColumnSettingsType;
  onChange: (settings: ColumnSettingsType) => void;
  className?: string;
}

export interface ColumnSettingsType {
  dataType: string;
  width: number;
  editable: boolean;
  filterable: boolean;
  sortable: boolean;
  resizable: boolean;
  format: string;
  precision?: number;
  header?: {
    text: string;
    tooltip?: string;
  };
  menu?: {
    enabled: boolean;
    items?: string[];
  };
}

const ColumnSettings: React.FC<ColumnSettingsProps> = ({
  settings,
  onChange,
  className
}) => {
  const updateSettings = <K extends keyof ColumnSettingsType>(
    key: K, 
    value: ColumnSettingsType[K]
  ) => {
    onChange({
      ...settings,
      [key]: value
    });
  };

  const updateHeaderSettings = <K extends keyof ColumnSettingsType['header']>(
    key: K, 
    value: string
  ) => {
    onChange({
      ...settings,
      header: {
        ...settings.header,
        [key]: value
      }
    });
  };

  const updateMenuSettings = <K extends keyof ColumnSettingsType['menu']>(
    key: K, 
    value: any
  ) => {
    onChange({
      ...settings,
      menu: {
        ...settings.menu,
        [key]: value
      }
    });
  };

  return (
    <div className={cn('border rounded-md bg-white', className)}>
      <div className="border-b px-4 py-3 bg-gray-50 rounded-t-md">
        <h3 className="text-sm font-medium">Column Settings</h3>
      </div>
      
      <div className="p-4">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="format">Formatting</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4 pt-2 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="dataType">Data Type</Label>
                <Select
                  value={settings.dataType}
                  onValueChange={(value) => updateSettings('dataType', value)}
                >
                  <SelectTrigger id="dataType">
                    <SelectValue placeholder="Select data type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="string">String</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                    <SelectItem value="boolean">Boolean</SelectItem>
                    <SelectItem value="object">Object</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="width">Width (px)</Label>
                <Input
                  id="width"
                  type="number"
                  value={settings.width}
                  onChange={(e) => updateSettings('width', parseInt(e.target.value))}
                  className="input-focus-animation"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headerText">Header Text</Label>
                <Input
                  id="headerText"
                  value={settings.header?.text || ''}
                  onChange={(e) => updateHeaderSettings('text', e.target.value)}
                  className="input-focus-animation"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="headerTooltip">Header Tooltip</Label>
                <Input
                  id="headerTooltip"
                  value={settings.header?.tooltip || ''}
                  onChange={(e) => updateHeaderSettings('tooltip', e.target.value)}
                  className="input-focus-animation"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="format" className="space-y-4 pt-2 animate-fade-in">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="format">Format</Label>
                <Select
                  value={settings.format}
                  onValueChange={(value) => updateSettings('format', value)}
                >
                  <SelectTrigger id="format">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="number">Number</SelectItem>
                    <SelectItem value="currency">Currency</SelectItem>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="date">Date</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(settings.format === 'number' || settings.format === 'currency' || settings.format === 'percentage') && (
                <div className="space-y-2">
                  <Label htmlFor="precision">Decimal Precision</Label>
                  <Select
                    value={String(settings.precision || 2)}
                    onValueChange={(value) => updateSettings('precision', parseInt(value))}
                  >
                    <SelectTrigger id="precision">
                      <SelectValue placeholder="Select precision" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="space-y-4 pt-2 animate-fade-in">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="editable" className="cursor-pointer">Editable</Label>
                <Checkbox
                  id="editable"
                  checked={settings.editable}
                  onCheckedChange={(checked) => 
                    updateSettings('editable', checked as boolean)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="filterable" className="cursor-pointer">Filterable</Label>
                <Checkbox
                  id="filterable"
                  checked={settings.filterable}
                  onCheckedChange={(checked) => 
                    updateSettings('filterable', checked as boolean)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="sortable" className="cursor-pointer">Sortable</Label>
                <Checkbox
                  id="sortable"
                  checked={settings.sortable}
                  onCheckedChange={(checked) => 
                    updateSettings('sortable', checked as boolean)
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="resizable" className="cursor-pointer">Resizable</Label>
                <Checkbox
                  id="resizable"
                  checked={settings.resizable}
                  onCheckedChange={(checked) => 
                    updateSettings('resizable', checked as boolean)
                  }
                />
              </div>
              
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="menuEnabled" className="cursor-pointer">Enable Context Menu</Label>
                  <Checkbox
                    id="menuEnabled"
                    checked={settings.menu?.enabled}
                    onCheckedChange={(checked) => 
                      updateMenuSettings('enabled', checked as boolean)
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ColumnSettings;
