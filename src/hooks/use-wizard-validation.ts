
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ColumnSettingsType } from '@/components/features/ColumnSettings';

interface WizardData {
  columnId: string;
  columnName: string;
  expression: string;
  settings: ColumnSettingsType;
}

export const useWizardValidation = (initialData?: Partial<WizardData>) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('type');
  
  const validateTypeTab = (columnId: string, columnName: string): boolean => {
    if (!columnId || !columnName) {
      toast({
        title: "Error",
        description: "Column ID and Name are required",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };
  
  const validateExpressionTab = (expression: string): boolean => {
    if (!expression) {
      toast({
        title: "Error",
        description: "Expression is required",
        variant: "destructive"
      });
      return false;
    }
    return true;
  };
  
  const handleTabChange = (
    value: string, 
    columnId: string, 
    columnName: string, 
    expression: string
  ): boolean => {
    if (value === 'expression' && !validateTypeTab(columnId, columnName)) {
      return false;
    }
    
    if (value === 'settings' && !validateExpressionTab(expression)) {
      return false;
    }
    
    setActiveTab(value);
    return true;
  };
  
  const handleNext = (
    columnId: string, 
    columnName: string, 
    expression: string
  ): boolean => {
    if (activeTab === 'type') {
      if (!validateTypeTab(columnId, columnName)) {
        return false;
      }
      setActiveTab('expression');
    } else if (activeTab === 'expression') {
      if (!validateExpressionTab(expression)) {
        return false;
      }
      setActiveTab('settings');
    } else if (activeTab === 'settings') {
      setActiveTab('summary');
    }
    return true;
  };
  
  const handleBack = (): void => {
    if (activeTab === 'expression') {
      setActiveTab('type');
    } else if (activeTab === 'settings') {
      setActiveTab('expression');
    } else if (activeTab === 'summary') {
      setActiveTab('settings');
    }
  };
  
  return {
    activeTab,
    handleTabChange,
    handleNext,
    handleBack,
    validateTypeTab,
    validateExpressionTab
  };
};
