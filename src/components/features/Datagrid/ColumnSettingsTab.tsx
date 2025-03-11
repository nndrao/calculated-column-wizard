import React, { useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline, Settings, Code } from 'lucide-react';

interface ColumnSettingsTabProps {
  columnDefs: ColDef[];
  onUpdateColumnDef?: (field: string, colDef: Partial<ColDef>) => void;
}

type BorderSide = 'top' | 'right' | 'bottom' | 'left';

interface StyleSettings {
  fontWeight: 'normal' | 'bold';
  fontStyle: 'normal' | 'italic';
  textDecoration: 'none' | 'underline';
  textAlign: 'left' | 'center' | 'right';
  backgroundColor: string;
  color: string;
  border: {
    [key in BorderSide]: {
      width: number;
      style: 'none' | 'solid' | 'dashed' | 'dotted';
      color: string;
    };
  };
}

interface ColumnSettings {
  headerName: string;
  headerTooltip: string;
  cellTooltip: string;
  headerStyle: StyleSettings;
  cellStyle: StyleSettings;
  valueFormatter: string;
  customFormatter: string;
  editable: boolean;
  cellEditor: string;
  cellRenderer: string;
}

const defaultStyleSettings: StyleSettings = {
  fontWeight: 'normal',
  fontStyle: 'normal',
  textDecoration: 'none',
  textAlign: 'left',
  backgroundColor: '#ffffff',
  color: '#000000',
  border: {
    top: { width: 1, style: 'solid', color: '#e2e8f0' },
    right: { width: 1, style: 'solid', color: '#e2e8f0' },
    bottom: { width: 1, style: 'solid', color: '#e2e8f0' },
    left: { width: 1, style: 'solid', color: '#e2e8f0' }
  }
};

const defaultColumnSettings: ColumnSettings = {
  headerName: '',
  headerTooltip: '',
  cellTooltip: '',
  headerStyle: { ...defaultStyleSettings },
  cellStyle: { ...defaultStyleSettings },
  valueFormatter: 'default',
  customFormatter: '',
  editable: false,
  cellEditor: 'default',
  cellRenderer: 'default'
};

const ColumnSettingsTab: React.FC<ColumnSettingsTabProps> = ({ 
  columnDefs, 
  onUpdateColumnDef 
}) => {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [settings, setSettings] = useState<ColumnSettings>({ ...defaultColumnSettings });
  const [currentTab, setCurrentTab] = useState('general');

  const selectedColDef = columnDefs.find(col => col.field === selectedField);

  React.useEffect(() => {
    if (selectedColDef) {
      setSettings({
        headerName: selectedColDef.headerName || '',
        headerTooltip: selectedColDef.headerTooltip || '',
        cellTooltip: selectedColDef.tooltipField || '',
        headerStyle: { ...defaultStyleSettings },
        cellStyle: { ...defaultStyleSettings },
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

    const colDefUpdate: Partial<ColDef> = {
      headerName: settings.headerName,
      headerTooltip: settings.headerTooltip,
      tooltipField: settings.cellTooltip,
      editable: settings.editable
    };

    const headerStyle = {
      fontWeight: settings.headerStyle.fontWeight,
      fontStyle: settings.headerStyle.fontStyle,
      textDecoration: settings.headerStyle.textDecoration,
      textAlign: settings.headerStyle.textAlign,
      backgroundColor: settings.headerStyle.backgroundColor,
      color: settings.headerStyle.color,
      borderTop: `${settings.headerStyle.border.top.width}px ${settings.headerStyle.border.top.style} ${settings.headerStyle.border.top.color}`,
      borderRight: `${settings.headerStyle.border.right.width}px ${settings.headerStyle.border.right.style} ${settings.headerStyle.border.right.color}`,
      borderBottom: `${settings.headerStyle.border.bottom.width}px ${settings.headerStyle.border.bottom.style} ${settings.headerStyle.border.bottom.color}`,
      borderLeft: `${settings.headerStyle.border.left.width}px ${settings.headerStyle.border.left.style} ${settings.headerStyle.border.left.color}`
    };

    const cellStyle = {
      fontWeight: settings.cellStyle.fontWeight,
      fontStyle: settings.cellStyle.fontStyle,
      textDecoration: settings.cellStyle.textDecoration,
      textAlign: settings.cellStyle.textAlign,
      backgroundColor: settings.cellStyle.backgroundColor,
      color: settings.cellStyle.color,
      borderTop: `${settings.cellStyle.border.top.width}px ${settings.cellStyle.border.top.style} ${settings.cellStyle.border.top.color}`,
      borderRight: `${settings.cellStyle.border.right.width}px ${settings.cellStyle.border.right.style} ${settings.cellStyle.border.right.color}`,
      borderBottom: `${settings.cellStyle.border.bottom.width}px ${settings.cellStyle.border.bottom.style} ${settings.cellStyle.border.bottom.color}`,
      borderLeft: `${settings.cellStyle.border.left.width}px ${settings.cellStyle.border.left.style} ${settings.cellStyle.border.left.color}`
    };

    colDefUpdate.headerClass = 'custom-header';
    colDefUpdate.cellClass = 'custom-cell';
    
    colDefUpdate.cellStyle = cellStyle;
    
    colDefUpdate.headerComponentParams = {
      template: 
        `<div class="ag-header-cell-label" style="
          font-weight: ${headerStyle.fontWeight};
          font-style: ${headerStyle.fontStyle};
          text-decoration: ${headerStyle.textDecoration};
          text-align: ${headerStyle.textAlign};
          background-color: ${headerStyle.backgroundColor};
          color: ${headerStyle.color};
          border-top: ${headerStyle.borderTop};
          border-right: ${headerStyle.borderRight};
          border-bottom: ${headerStyle.borderBottom};
          border-left: ${headerStyle.borderLeft};
        "><span ref="eText" class="ag-header-cell-text"></span></div>`
    };

    if (settings.valueFormatter !== 'default') {
      if (settings.valueFormatter === 'number') {
        colDefUpdate.valueFormatter = (params) => {
          return new Intl.NumberFormat().format(params.value);
        };
      } else if (settings.valueFormatter === 'currency') {
        colDefUpdate.valueFormatter = (params) => {
          return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(params.value);
        };
      } else if (settings.valueFormatter === 'percentage') {
        colDefUpdate.valueFormatter = (params) => {
          return new Intl.NumberFormat('en-US', { style: 'percent' }).format(params.value / 100);
        };
      } else if (settings.valueFormatter === 'date') {
        colDefUpdate.valueFormatter = (params) => {
          return new Date(params.value).toLocaleDateString();
        };
      } else if (settings.valueFormatter === 'custom' && settings.customFormatter) {
        try {
          colDefUpdate.valueFormatter = (params) => {
            const formatterFn = new Function('value', 'data', 'column', `return ${settings.customFormatter}`);
            return formatterFn(params.value, params.data, params.column);
          };
        } catch (error) {
          console.error("Invalid custom formatter:", error);
        }
      }
    }

    if (settings.cellEditor !== 'default') {
      colDefUpdate.cellEditor = settings.cellEditor;
    }

    if (settings.cellRenderer !== 'default') {
      colDefUpdate.cellRenderer = settings.cellRenderer;
    }

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

  if (selectedField) {
    return (
      <div className="flex h-full overflow-hidden">
        <div className="w-60 border-r overflow-y-auto bg-gray-50 p-4">
          <h3 className="font-medium text-sm mb-3">Available Columns</h3>
          <div className="space-y-1">
            {columnDefs.map((col) => (
              <div
                key={col.field}
                className={`px-3 py-2 rounded text-sm cursor-pointer ${
                  selectedField === col.field
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => setSelectedField(col.field || null)}
              >
                {col.headerName || col.field}
              </div>
            ))}
          </div>
        </div>

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

              {currentTab === 'general' && (
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
                </div>
              )}

              {currentTab === 'header' && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Text Alignment</Label>
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          type="button"
                          variant={settings.headerStyle.textAlign === 'left' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('headerStyle', 'textAlign', 'left')}
                        >
                          <AlignLeft size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.headerStyle.textAlign === 'center' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('headerStyle', 'textAlign', 'center')}
                        >
                          <AlignCenter size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.headerStyle.textAlign === 'right' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('headerStyle', 'textAlign', 'right')}
                        >
                          <AlignRight size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Text Style</Label>
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          type="button"
                          variant={settings.headerStyle.fontWeight === 'bold' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('headerStyle', 'fontWeight', 
                            settings.headerStyle.fontWeight === 'bold' ? 'normal' : 'bold'
                          )}
                        >
                          <Bold size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.headerStyle.fontStyle === 'italic' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('headerStyle', 'fontStyle', 
                            settings.headerStyle.fontStyle === 'italic' ? 'normal' : 'italic'
                          )}
                        >
                          <Italic size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.headerStyle.textDecoration === 'underline' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('headerStyle', 'textDecoration', 
                            settings.headerStyle.textDecoration === 'underline' ? 'none' : 'underline'
                          )}
                        >
                          <Underline size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="headerBgColor">Background Color</Label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 border rounded" 
                          style={{ backgroundColor: settings.headerStyle.backgroundColor }} 
                        />
                        <Input
                          id="headerBgColor"
                          type="color"
                          value={settings.headerStyle.backgroundColor}
                          onChange={(e) => updateStyleSetting('headerStyle', 'backgroundColor', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="headerTextColor">Text Color</Label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 border rounded" 
                          style={{ backgroundColor: settings.headerStyle.color }} 
                        />
                        <Input
                          id="headerTextColor"
                          type="color"
                          value={settings.headerStyle.color}
                          onChange={(e) => updateStyleSetting('headerStyle', 'color', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label>Border Settings</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {(['top', 'right', 'bottom', 'left'] as BorderSide[]).map(side => (
                        <div key={side} className="space-y-2 border p-3 rounded-md">
                          <Label className="capitalize">{side} Border</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label className="text-xs">Width</Label>
                              <Input
                                type="number"
                                min="0"
                                max="5"
                                value={settings.headerStyle.border[side].width}
                                onChange={(e) => updateBorderSetting('headerStyle', side, 'width', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Style</Label>
                              <Select
                                value={settings.headerStyle.border[side].style}
                                onValueChange={(value: any) => updateBorderSetting('headerStyle', side, 'style', value)}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">None</SelectItem>
                                  <SelectItem value="solid">Solid</SelectItem>
                                  <SelectItem value="dashed">Dashed</SelectItem>
                                  <SelectItem value="dotted">Dotted</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">Color</Label>
                              <Input
                                type="color"
                                value={settings.headerStyle.border[side].color}
                                onChange={(e) => updateBorderSetting('headerStyle', side, 'color', e.target.value)}
                                className="h-8"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentTab === 'cell' && (
                <div className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Text Alignment</Label>
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          type="button"
                          variant={settings.cellStyle.textAlign === 'left' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('cellStyle', 'textAlign', 'left')}
                        >
                          <AlignLeft size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.cellStyle.textAlign === 'center' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('cellStyle', 'textAlign', 'center')}
                        >
                          <AlignCenter size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.cellStyle.textAlign === 'right' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('cellStyle', 'textAlign', 'right')}
                        >
                          <AlignRight size={16} />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Text Style</Label>
                      <div className="flex border rounded-md overflow-hidden">
                        <Button
                          type="button"
                          variant={settings.cellStyle.fontWeight === 'bold' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('cellStyle', 'fontWeight', 
                            settings.cellStyle.fontWeight === 'bold' ? 'normal' : 'bold'
                          )}
                        >
                          <Bold size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.cellStyle.fontStyle === 'italic' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('cellStyle', 'fontStyle', 
                            settings.cellStyle.fontStyle === 'italic' ? 'normal' : 'italic'
                          )}
                        >
                          <Italic size={16} />
                        </Button>
                        <Button
                          type="button"
                          variant={settings.cellStyle.textDecoration === 'underline' ? 'default' : 'ghost'}
                          className="flex-1 rounded-none"
                          onClick={() => updateStyleSetting('cellStyle', 'textDecoration', 
                            settings.cellStyle.textDecoration === 'underline' ? 'none' : 'underline'
                          )}
                        >
                          <Underline size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="cellBgColor">Background Color</Label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 border rounded" 
                          style={{ backgroundColor: settings.cellStyle.backgroundColor }} 
                        />
                        <Input
                          id="cellBgColor"
                          type="color"
                          value={settings.cellStyle.backgroundColor}
                          onChange={(e) => updateStyleSetting('cellStyle', 'backgroundColor', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cellTextColor">Text Color</Label>
                      <div className="flex items-center space-x-2">
                        <div 
                          className="w-8 h-8 border rounded" 
                          style={{ backgroundColor: settings.cellStyle.color }} 
                        />
                        <Input
                          id="cellTextColor"
                          type="color"
                          value={settings.cellStyle.color}
                          onChange={(e) => updateStyleSetting('cellStyle', 'color', e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Label>Border Settings</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {(['top', 'right', 'bottom', 'left'] as BorderSide[]).map(side => (
                        <div key={side} className="space-y-2 border p-3 rounded-md">
                          <Label className="capitalize">{side} Border</Label>
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <Label className="text-xs">Width</Label>
                              <Input
                                type="number"
                                min="0"
                                max="5"
                                value={settings.cellStyle.border[side].width}
                                onChange={(e) => updateBorderSetting('cellStyle', side, 'width', parseInt(e.target.value))}
                                className="h-8"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Style</Label>
                              <Select
                                value={settings.cellStyle.border[side].style}
                                onValueChange={(value: any) => updateBorderSetting('cellStyle', side, 'style', value)}
                              >
                                <SelectTrigger className="h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="none">None</SelectItem>
                                  <SelectItem value="solid">Solid</SelectItem>
                                  <SelectItem value="dashed">Dashed</SelectItem>
                                  <SelectItem value="dotted">Dotted</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label className="text-xs">Color</Label>
                              <Input
                                type="color"
                                value={settings.cellStyle.border[side].color}
                                onChange={(e) => updateBorderSetting('cellStyle', side, 'color', e.target.value)}
                                className="h-8"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {currentTab === 'format' && (
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
                </div>
              )}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <Settings className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">Select a Column</h3>
        <p className="text-gray-500 max-w-md">
          Choose a column from the list on the left to configure its settings.
        </p>
      </div>
    </div>
  );
};

export default ColumnSettingsTab;

