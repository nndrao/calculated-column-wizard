import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import CalculatedColumnWizard from '@/components/features/CalculatedColumnWizard';
import AgGridWrapper from '@/components/features/AgGridWrapper';
import { ColumnSettingsType } from '@/components/features/ColumnSettings';
import { ColDef } from 'ag-grid-community';
import { toast } from 'sonner';

interface CalculatedColumn {
  columnId: string;
  columnName: string;
  expression: string;
  settings: ColumnSettingsType;
}

// Sample data for AG-Grid
const sampleColumnDefs: ColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First Name' },
  { field: 'lastName', headerName: 'Last Name' },
  { field: 'age', headerName: 'Age', width: 90 },
  { field: 'salary', headerName: 'Salary' },
  { field: 'department', headerName: 'Department' }
];

const sampleRowData = [
  { id: 1, firstName: 'John', lastName: 'Doe', age: 35, salary: 50000, department: 'IT' },
  { id: 2, firstName: 'Jane', lastName: 'Smith', age: 32, salary: 55000, department: 'HR' },
  { id: 3, firstName: 'Bob', lastName: 'Johnson', age: 45, salary: 60000, department: 'Finance' },
  { id: 4, firstName: 'Alice', lastName: 'Williams', age: 28, salary: 48000, department: 'Marketing' },
  { id: 5, firstName: 'Charlie', lastName: 'Brown', age: 39, salary: 65000, department: 'Operations' },
  { id: 6, firstName: 'Diana', lastName: 'Davis', age: 27, salary: 51000, department: 'IT' },
  { id: 7, firstName: 'Edward', lastName: 'Miller', age: 41, salary: 72000, department: 'Finance' },
  { id: 8, firstName: 'Fiona', lastName: 'Wilson', age: 33, salary: 54000, department: 'HR' },
  { id: 9, firstName: 'George', lastName: 'Moore', age: 29, salary: 49000, department: 'Marketing' },
  { id: 10, firstName: 'Hannah', lastName: 'Taylor', age: 38, salary: 63000, department: 'Operations' }
];

const Index = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [columns, setColumns] = useState<CalculatedColumn[]>([]);
  const [showWizard, setShowWizard] = useState(false);
  const [editingColumn, setEditingColumn] = useState<CalculatedColumn | null>(null);
  
  const handleToggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };
  
  const handleSaveColumn = (column: CalculatedColumn) => {
    let fixedExpression = column.expression;
    
    if (!fixedExpression.includes('[') && (
      fixedExpression.includes('firstName') || 
      fixedExpression.includes('lastName') || 
      fixedExpression.includes('age') || 
      fixedExpression.includes('salary') || 
      fixedExpression.includes('department')
    )) {
      toast.warning("Your expression may not work correctly. Make sure to wrap field names in square brackets, e.g. [salary] * 2");
    }
    
    const existingIndex = columns.findIndex(c => c.columnId === column.columnId);
    
    if (existingIndex >= 0) {
      const updatedColumns = [...columns];
      updatedColumns[existingIndex] = column;
      setColumns(updatedColumns);
      toast.success("Column updated successfully");
    } else {
      setColumns(prev => [...prev, column]);
      toast.success("New calculated column added");
    }
    setShowWizard(false);
    setEditingColumn(null);
  };
  
  const handleNewColumn = () => {
    setEditingColumn(null);
    setShowWizard(true);
  };
  
  const handleEditColumn = () => {
    if (columns.length > 0) {
      setEditingColumn(columns[0]);
      setShowWizard(true);
    } else {
      toast.error("No columns to edit");
    }
  };
  
  const handleDeleteColumn = () => {
    if (columns.length > 0) {
      setColumns(prev => prev.slice(1));
      toast.success("Column deleted successfully");
    } else {
      toast.error("No columns to delete");
    }
  };
  
  const handleCancelWizard = () => {
    setShowWizard(false);
    setEditingColumn(null);
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
          onNew={handleNewColumn}
          onEdit={handleEditColumn}
          onDelete={handleDeleteColumn}
        />
        
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {!showWizard ? (
              <>
                <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                  <h2 className="text-lg font-medium mb-4">AG-Grid with Calculated Columns</h2>
                  <AgGridWrapper 
                    columnDefs={sampleColumnDefs}
                    rowData={sampleRowData}
                    calculatedColumns={columns}
                  />
                </div>
                
                {columns.length > 0 && (
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-200">
                    <h2 className="text-lg font-medium mb-4">Calculated Columns</h2>
                    <div className="space-y-2">
                      {columns.map((column, index) => (
                        <div key={column.columnId} className="p-3 border rounded-md flex justify-between items-center">
                          <div>
                            <p className="font-medium">{column.columnName}</p>
                            <p className="text-sm text-gray-500">ID: {column.columnId}</p>
                            <p className="text-xs font-mono mt-1">{column.expression}</p>
                          </div>
                          <div className="flex gap-2">
                            <button 
                              className="text-blue-600 hover:underline text-sm"
                              onClick={() => {
                                setEditingColumn(column);
                                setShowWizard(true);
                              }}
                            >
                              Edit
                            </button>
                            <button 
                              className="text-red-600 hover:underline text-sm"
                              onClick={() => {
                                setColumns(columns.filter((_, i) => i !== index));
                                toast.success("Column deleted");
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <CalculatedColumnWizard 
                onSave={handleSaveColumn}
                onCancel={handleCancelWizard}
                initialData={editingColumn || undefined}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
