
import React from 'react';
import { Button } from '@/components/ui/button';

interface WizardFooterProps {
  activeTab: string;
  onBack: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSave: () => void;
}

const WizardFooter: React.FC<WizardFooterProps> = ({
  activeTab,
  onBack,
  onNext,
  onCancel,
  onSave
}) => {
  return (
    <div className="flex-shrink-0 flex justify-between w-full p-4 bg-gray-50 border-t">
      <div>
        {activeTab !== 'type' && (
          <Button 
            variant="outline" 
            onClick={onBack}
            className="shadow-sm transition-all duration-200"
          >
            Back
          </Button>
        )}
      </div>
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          onClick={onCancel}
          className="shadow-sm transition-all duration-200"
        >
          Cancel
        </Button>
        {activeTab !== 'summary' ? (
          <Button 
            onClick={onNext}
            className="shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow-md"
          >
            Next
          </Button>
        ) : (
          <Button 
            onClick={onSave}
            className="shadow-sm transition-all duration-200 hover:translate-y-[-1px] hover:shadow-md"
          >
            Save Column
          </Button>
        )}
      </div>
    </div>
  );
};

export default WizardFooter;
