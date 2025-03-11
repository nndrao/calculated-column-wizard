
import React, { useState, useEffect } from 'react';
import { ColDef } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ColumnSettings, ColumnSettingsTabProps, StyleSettings, BorderSide } from './column-settings/types';
import { defaultColumnSettings } from './column-settings/constants';
import { buildColumnDef } from './column-settings/utils';
import ColumnSelector from './column-settings/ColumnSelector';
import EmptyState from './column-settings/EmptyState';
import GeneralTab from './column-settings/GeneralTab';
import StyleTab from './column-settings/StyleTab';
import FormatTab from './column-settings/FormatTab';

const ColumnSettingsTab: React.FC<ColumnSettingsTabProps> = ({ 
  columnDefs, 
  onUpdateColumnDef 
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [settings, setSettings] = useState<ColumnSettings>({ ...defaultColumnSettings });
  const [currentTab, setCurrentTab] = useState('general');

  const selectedColDef = columnDefs.find(col => col.field === selectedField);

  useEffect(() => {
    if (selectedColDef) {
      setSettings({
        headerName: selectedColDef.headerName || '',
        headerTooltip: selectedColDef.headerTooltip || '',
        cellTooltip: selectedColDef.tooltipField || '',
        headerStyle: defaultColumnSettings.headerStyle,
        cellStyle: defaultColumnSettings.cellStyle,
        valueFormatter: 'default',
        customFormatter: '',
        editable: selectedColDef.editable === true,
        cellEditor: selectedColDef.cellEditor || 'default',
        cellRenderer: selectedColDef.cellRenderer || 'default'
      });
    } else {
      setSettings({ ...defaultColumnSettings });
    }
  }, [selectedField, selectedColDef]);

  const handleSaveChanges = () => {
    if (!selectedField || !onUpdateColumnDef) return;
    
    const colDefUpdate = buildColumnDef(settings, selectedField);
    onUpdateColumnDef(selectedField, colDefUpdate);
  };

  const updateStyleSetting = (
    target: 'headerStyle' | 'cellStyle',
    property: keyof StyleSettings,
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [target]: {
        ...prev[target],
        [property]: value
      }
    }));
  };

  const updateBorderSetting = (
    target: 'headerStyle' | 'cellStyle',
    side: BorderSide,
    property: keyof StyleSettings['border']['top'],
    value: any
  ) => {
    setSettings(prev => ({
      ...prev,
      [target]: {
        ...prev[target],
        border: {
          ...prev[target].border,
          [side]: {
            ...prev[target].border[side],
            [property]: value
          }
        }
      }
    }));
  };

  if (!selectedField) {
    return (
      <div className="h-full">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="flex h-full overflow-hidden">
      <ColumnSelector 
        columnDefs={columnDefs}
        selectedField={selectedField}
        setSelectedField={setSelectedField}
      />

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              Column: <span className="text-primary">{selectedField}</span>
            </h2>
            <Button onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>

          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="header">Header Style</TabsTrigger>
              <TabsTrigger value="cell">Cell Style</TabsTrigger>
              <TabsTrigger value="format">Formatting</TabsTrigger>
            </TabsList>

            <TabsContent value="general">
              <GeneralTab settings={settings} setSettings={setSettings} />
            </TabsContent>
            
            <TabsContent value="header">
              <StyleTab 
                settings={settings} 
                tabType="header"
                updateStyleSetting={updateStyleSetting}
                updateBorderSetting={updateBorderSetting}
              />
            </TabsContent>
            
            <TabsContent value="cell">
              <StyleTab 
                settings={settings} 
                tabType="cell"
                updateStyleSetting={updateStyleSetting}
                updateBorderSetting={updateBorderSetting}
              />
            </TabsContent>
            
            <TabsContent value="format">
              <FormatTab settings={settings} setSettings={setSettings} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ColumnSettingsTab;
