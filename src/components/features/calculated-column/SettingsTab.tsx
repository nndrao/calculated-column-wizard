
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
    <ColumnSettings 
      settings={settings}
      onChange={onSettingsChange}
    />
  );
};

export default SettingsTab;
