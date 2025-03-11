
import { useState } from 'react';

export const useDialogDrag = () => {
  const [dialogPosition, setDialogPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsDragging(false);
      return;
    }
    
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - dialogPosition.x, 
      y: e.clientY - dialogPosition.y 
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      setDialogPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsDragging(true);
    setDragStart({ 
      x: e.clientX - dialogPosition.x, 
      y: e.clientY - dialogPosition.y 
    });
  };

  return {
    dialogPosition,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    startDragging
  };
};
