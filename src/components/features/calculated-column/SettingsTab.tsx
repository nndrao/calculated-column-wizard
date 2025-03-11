
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
    <div className="w-full max-w-4xl">
      <ColumnSettings 
        settings={settings}
        onChange={onSettingsChange}
        className="w-full"
      />
    </div>
  );
};

export default SettingsTab;
