
import React from 'react';
import { 
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const WizardHeader: React.FC = () => {
  return (
    <CardHeader className="bg-gray-50 border-b pb-3 pt-4 flex-none">
      <CardTitle className="text-lg font-medium">Calculated Column Wizard</CardTitle>
      <CardDescription>
        Create a new calculated column based on an expression for AG-Grid
      </CardDescription>
    </CardHeader>
  );
};

export default WizardHeader;
