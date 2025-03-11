
import React from 'react';
import WizardSummary from '../WizardSummary';
import { ColumnSettingsType } from '../ColumnSettings';

interface SummaryTabProps {
  columnId: string;
  columnName: string;
  expression: string;
  settings: ColumnSettingsType;
}

const SummaryTab: React.FC<SummaryTabProps> = ({
  columnId,
  columnName,
  expression,
  settings
}) => {
  return (
    <WizardSummary 
      columnId={columnId}
      columnName={columnName}
      expression={expression}
      settings={settings}
    />
  );
};

export default SummaryTab;
