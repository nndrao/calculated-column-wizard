
import React from 'react';
import ColumnSettings, { ColumnSettingsType } from '../ColumnSettings';

interface SettingsTabProps {
  settings: ColumnSettingsType;
  onSettingsChange: (settings: ColumnSettingsType) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onSettingsChange
}) => {
  return (
    <>
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-1">Column Settings</h3>
        <p className="text-sm text-muted-foreground">
          Configure how the calculated column will behave and display in AG-Grid
        </p>
      </div>
      
      <ColumnSettings 
        settings={settings}
        onChange={onSettingsChange}
      />
    </>
  );
};

export default SettingsTab;
