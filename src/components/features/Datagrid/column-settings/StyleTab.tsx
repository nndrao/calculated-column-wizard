
import React from 'react';
import { ColumnSettings, BorderSide, StyleSettings } from './types';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlignCenter, AlignLeft, AlignRight, Bold, Italic, Underline } from 'lucide-react';

interface StyleTabProps {
  settings: ColumnSettings;
  tabType: 'header' | 'cell';
  updateStyleSetting: (target: 'headerStyle' | 'cellStyle', property: keyof StyleSettings, value: any) => void;
  updateBorderSetting: (target: 'headerStyle' | 'cellStyle', side: BorderSide, property: keyof StyleSettings['border']['top'], value: any) => void;
}

const StyleTab: React.FC<StyleTabProps> = ({ 
  settings, 
  tabType,
  updateStyleSetting,
  updateBorderSetting
}) => {
  const targetStyle = tabType === 'header' ? 'headerStyle' : 'cellStyle';
  const styleSettings = tabType === 'header' ? settings.headerStyle : settings.cellStyle;

  return (
    <div className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Text Alignment</Label>
          <div className="flex border rounded-md overflow-hidden">
            <Button
              type="button"
              variant={styleSettings.textAlign === 'left' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => updateStyleSetting(targetStyle, 'textAlign', 'left')}
            >
              <AlignLeft size={16} />
            </Button>
            <Button
              type="button"
              variant={styleSettings.textAlign === 'center' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => updateStyleSetting(targetStyle, 'textAlign', 'center')}
            >
              <AlignCenter size={16} />
            </Button>
            <Button
              type="button"
              variant={styleSettings.textAlign === 'right' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => updateStyleSetting(targetStyle, 'textAlign', 'right')}
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
              variant={styleSettings.fontWeight === 'bold' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => updateStyleSetting(targetStyle, 'fontWeight', 
                styleSettings.fontWeight === 'bold' ? 'normal' : 'bold'
              )}
            >
              <Bold size={16} />
            </Button>
            <Button
              type="button"
              variant={styleSettings.fontStyle === 'italic' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => updateStyleSetting(targetStyle, 'fontStyle', 
                styleSettings.fontStyle === 'italic' ? 'normal' : 'italic'
              )}
            >
              <Italic size={16} />
            </Button>
            <Button
              type="button"
              variant={styleSettings.textDecoration === 'underline' ? 'default' : 'ghost'}
              className="flex-1 rounded-none"
              onClick={() => updateStyleSetting(targetStyle, 'textDecoration', 
                styleSettings.textDecoration === 'underline' ? 'none' : 'underline'
              )}
            >
              <Underline size={16} />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <Label htmlFor={`${tabType}BgColor`}>Background Color</Label>
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 border rounded" 
              style={{ backgroundColor: styleSettings.backgroundColor }} 
            />
            <Input
              id={`${tabType}BgColor`}
              type="color"
              value={styleSettings.backgroundColor}
              onChange={(e) => updateStyleSetting(targetStyle, 'backgroundColor', e.target.value)}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`${tabType}TextColor`}>Text Color</Label>
          <div className="flex items-center space-x-2">
            <div 
              className="w-8 h-8 border rounded" 
              style={{ backgroundColor: styleSettings.color }} 
            />
            <Input
              id={`${tabType}TextColor`}
              type="color"
              value={styleSettings.color}
              onChange={(e) => updateStyleSetting(targetStyle, 'color', e.target.value)}
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
                    value={styleSettings.border[side].width}
                    onChange={(e) => updateBorderSetting(targetStyle, side, 'width', parseInt(e.target.value))}
                    className="h-8"
                  />
                </div>
                <div>
                  <Label className="text-xs">Style</Label>
                  <Select
                    value={styleSettings.border[side].style}
                    onValueChange={(value: any) => updateBorderSetting(targetStyle, side, 'style', value)}
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
                    value={styleSettings.border[side].color}
                    onChange={(e) => updateBorderSetting(targetStyle, side, 'color', e.target.value)}
                    className="h-8"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StyleTab;
