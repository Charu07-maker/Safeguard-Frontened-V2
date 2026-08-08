import React from 'react';

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number; // 0 - 100
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'indigo' | 'emerald' | 'amber' | 'neutral';
  showValueLabel?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = 'md',
  variant = 'indigo',
  showValueLabel = false,
  valuePrefix = '',
  valueSuffix = '%',
  className = '',
  ...props
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const variantBarStyles = {
    indigo: 'bg-indigo-800',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-600',
    neutral: 'bg-stone-700',
  };

  return (
    <div className={`w-full ${className}`} {...props}>
      {showValueLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-slate-600 mb-1.5">
          <span>Progress</span>
          <span>
            {valuePrefix}
            {Math.round(percentage)}
            {valueSuffix}
          </span>
        </div>
      )}
      <div className={`w-full bg-stone-100 rounded-full overflow-hidden border border-stone-200/60 ${sizeStyles[size]}`}>
        <div
          className={`h-full transition-all duration-500 ease-out rounded-full ${variantBarStyles[variant]}`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
};

export interface RadialProgressProps {
  value: number; // 0 - 100
  size?: number;
  strokeWidth?: number;
  variant?: 'indigo' | 'emerald' | 'amber';
  label?: string;
  sublabel?: string;
}

export const RadialProgress: React.FC<RadialProgressProps> = ({
  value,
  size = 120,
  strokeWidth = 10,
  variant = 'indigo',
  label,
  sublabel,
}) => {
  const normalizedValue = Math.min(100, Math.max(0, value));
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (normalizedValue / 100) * circumference;

  const colorMap = {
    indigo: '#3730A3',
    emerald: '#059669',
    amber: '#D97706',
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F5F5F4"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colorMap[variant]}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-2xl font-bold text-slate-900 tracking-tight">
          {label ?? `${Math.round(normalizedValue)}%`}
        </span>
        {sublabel && <span className="text-xs text-slate-500 font-medium">{sublabel}</span>}
      </div>
    </div>
  );
};
