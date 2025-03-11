
import React from 'react';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface DialogWrapperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dialogPosition: { x: number; y: number };
  isDragging: boolean;
  handleMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  handleMouseUp: () => void;
  children: React.ReactNode;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  open,
  onOpenChange,
  dialogPosition,
  isDragging,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  children
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-5xl p-0 h-[85vh] rounded-lg overflow-hidden border border-gray-200 shadow-xl bg-white/90 backdrop-blur-sm"
        style={{ 
          transform: `translate(-50%, -50%) translate(${dialogPosition.x}px, ${dialogPosition.y}px)`,
          transition: isDragging ? 'none' : 'all 0.2s ease',
          cursor: isDragging ? 'grabbing' : 'auto'
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="flex flex-col h-full overflow-hidden"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogWrapper;
