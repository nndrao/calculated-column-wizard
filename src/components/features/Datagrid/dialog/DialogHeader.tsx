
import React from 'react';
import { DialogClose, DialogTitle } from "@/components/ui/dialog";
import { X } from 'lucide-react';

const DialogHeader: React.FC = () => {
  return (
    <div className="p-4 border-b bg-gradient-to-r from-gray-100 to-white flex-shrink-0">
      <div className="flex items-center justify-between">
        <DialogTitle className="text-xl font-semibold text-gray-800">Grid Settings</DialogTitle>
        <DialogClose className="rounded-full h-8 w-8 flex items-center justify-center hover:bg-gray-100">
          <X className="h-4 w-4" />
        </DialogClose>
      </div>
      <p className="text-sm text-gray-500 mt-1">Configure your data grid with calculated columns and display settings</p>
    </div>
  );
};

export default DialogHeader;
