
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
    <>
      <div className="mb-8">
        <h3 className="text-base font-semibold mb-1">Summary</h3>
        <p className="text-sm text-muted-foreground">
          Review your AG-Grid calculated column configuration
        </p>
      </div>
      
      <WizardSummary 
        columnId={columnId}
        columnName={columnName}
        expression={expression}
        settings={settings}
      />
    </>
  );
};

export default SummaryTab;
