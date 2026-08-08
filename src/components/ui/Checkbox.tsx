import React from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, description, className = '', id, checked, disabled, onChange, ...props }, ref) => {
    const generatedId = id || React.useId();

    return (
      <div className={`flex items-start space-x-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        <div className="relative flex items-center pt-0.5">
          <input
            type="checkbox"
            ref={ref}
            id={generatedId}
            checked={checked}
            disabled={disabled}
            onChange={onChange}
            className="sr-only peer"
            {...props}
          />
          <div
            onClick={() => {
              if (!disabled && onChange) {
                const event = {
                  target: { checked: !checked },
                } as React.ChangeEvent<HTMLInputElement>;
                onChange(event);
              }
            }}
            className={`w-5 h-5 rounded-md border transition-all duration-150 flex items-center justify-center ${
              checked
                ? 'bg-indigo-800 border-indigo-800 text-white'
                : 'bg-white border-stone-300 hover:border-stone-400'
            } peer-focus:ring-2 peer-focus:ring-indigo-800/20`}
          >
            {checked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
          </div>
        </div>
        {(label || description) && (
          <label htmlFor={generatedId} className="flex flex-col text-sm cursor-pointer select-none">
            {label && <span className="font-medium text-slate-900">{label}</span>}
            {description && <span className="text-xs text-slate-500 mt-0.5">{description}</span>}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
