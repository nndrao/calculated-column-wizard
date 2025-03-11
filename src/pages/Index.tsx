
import React, { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import CalculatedColumnWizard from '@/components/features/CalculatedColumnWizard';
import { ColumnSettingsType } from '@/components/features/ColumnSettings';
import { toast } from 'sonner';

interface CalculatedColumn {
  columnId: string;
  columnName: string;
  expression: string;
  settings: ColumnSettingsType;
}

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [columns, setColumns] = useState<CalculatedColumn[]>([]);
  
  const handleToggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };
  
  const handleSaveColumn = (column: CalculatedColumn) => {
    const existingIndex = columns.findIndex(c => c.columnId === column.columnId);
    
    if (existingIndex >= 0) {
      // Update existing column
      const updatedColumns = [...columns];
      updatedColumns[existingIndex] = column;
      setColumns(updatedColumns);
      toast.success("Column updated successfully");
    } else {
      // Add new column
      setColumns(prev => [...prev, column]);
      toast.success("New calculated column added");
    }
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onToggle={handleToggleSidebar}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Calculated Column"
          subtitle="Create and manage calculated columns for your AG-Grid"
          onNew={() => console.log('New column')}
          onEdit={() => console.log('Edit column')}
          onDelete={() => console.log('Delete column')}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto">
            <CalculatedColumnWizard onSave={handleSaveColumn} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
