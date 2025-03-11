import React, { useState } from 'react';
import { ColDef } from 'ag-grid-community';
import { ColumnSettingsType } from '@/components/features/ColumnSettings';
import { toast } from 'sonner';
import Datagrid from '@/components/features/Datagrid';

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
  const [columns, setColumns] = useState<CalculatedColumn[]>([]);
  
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
  };
  
  const handleDeleteColumn = (columnId: string) => {
    setColumns(prev => prev.filter(col => col.columnId !== columnId));
    toast.success("Column deleted successfully");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <Datagrid
          columnDefs={sampleColumnDefs}
          rowData={sampleRowData}
          calculatedColumns={columns}
          onSaveColumn={handleSaveColumn}
          onDeleteColumn={handleDeleteColumn}
        />
      </div>
    </div>
  );
};

export default Index;
