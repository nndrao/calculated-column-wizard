
import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, XCircle, Info, X } from 'lucide-react';

type ToastVariant = 'default' | 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  title: string;
  description?: string;
  variant?: ToastVariant;
  onClose?: () => void;
  className?: string;
}

const Toast: React.FC<ToastProps> = ({
  title,
  description,
  variant = 'default',
  onClose,
  className
}) => {
  const variantStyles = {
    default: {
      container: 'bg-white',
      icon: null,
      iconColor: 'text-gray-400'
    },
    success: {
      container: 'bg-green-50 border-green-200',
      icon: CheckCircle,
      iconColor: 'text-green-500'
    },
    error: {
      container: 'bg-red-50 border-red-200',
      icon: XCircle,
      iconColor: 'text-red-500'
    },
    warning: {
      container: 'bg-amber-50 border-amber-200',
      icon: AlertCircle,
      iconColor: 'text-amber-500'
    },
    info: {
      container: 'bg-blue-50 border-blue-200',
      icon: Info,
      iconColor: 'text-blue-500'
    }
  };
  
  const styles = variantStyles[variant];
  const IconComponent = styles.icon;
  
  return (
    <div 
      className={cn(
        'flex items-start rounded-md border shadow-sm p-4 animate-fade-in',
        styles.container,
        className
      )}
    >
      {IconComponent && (
        <IconComponent className={cn('h-5 w-5 mr-3 mt-0.5 flex-shrink-0', styles.iconColor)} />
      )}
      
      <div className="flex-1">
        <div className="font-medium">{title}</div>
        {description && (
          <div className="text-sm text-gray-500 mt-1">{description}</div>
        )}
      </div>
      
      {onClose && (
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-500 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};

export default Toast;
