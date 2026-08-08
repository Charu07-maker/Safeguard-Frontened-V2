import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps {
  type?: 'neutral' | 'info' | 'warning' | 'success' | 'privacy';
  title?: string;
  children: React.ReactNode;
  onDismiss?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'neutral',
  title,
  children,
  onDismiss,
  action,
  className = '',
}) => {
  const stylesMap = {
    neutral: {
      container: 'bg-stone-50 border-stone-200 text-slate-800',
      icon: <Info className="w-5 h-5 text-stone-600 shrink-0 mt-0.5" />,
    },
    info: {
      container: 'bg-sky-50/80 border-sky-200 text-sky-900',
      icon: <Info className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />,
    },
    warning: {
      container: 'bg-amber-50/80 border-amber-200 text-amber-900',
      icon: <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />,
    },
    success: {
      container: 'bg-emerald-50/80 border-emerald-200 text-emerald-900',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />,
    },
    privacy: {
      container: 'bg-indigo-50/70 border-indigo-200 text-indigo-950',
      icon: <AlertCircle className="w-5 h-5 text-indigo-800 shrink-0 mt-0.5" />,
    },
  };

  const { container, icon } = stylesMap[type];

  return (
    <div className={`p-4 rounded-2xl border ${container} flex items-start justify-between ${className}`}>
      <div className="flex items-start space-x-3 pr-2">
        {icon}
        <div className="flex-1 text-sm leading-relaxed">
          {title && <h4 className="font-semibold tracking-tight mb-0.5">{title}</h4>}
          <div>{children}</div>
        </div>
      </div>
      <div className="flex items-center space-x-2 shrink-0">
        {action}
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 rounded-md opacity-60 hover:opacity-100 transition-opacity"
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
