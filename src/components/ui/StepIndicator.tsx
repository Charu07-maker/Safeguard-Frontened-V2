import React from 'react';
import { Check } from 'lucide-react';

export interface Step {
  id: string;
  title: string;
  description?: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStepIndex: number;
  onStepClick?: (index: number) => void;
  className?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full py-4 ${className}`}>
      {/* Desktop Stepper */}
      <div className="hidden md:flex items-center justify-between w-full relative">
        {/* Connector Line */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-stone-200 -translate-y-1/2 z-0" />
        <div
          className="absolute top-1/2 left-0 h-0.5 bg-indigo-800 -translate-y-1/2 z-0 transition-all duration-300"
          style={{
            width: `${(currentStepIndex / (steps.length - 1)) * 100}%`,
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStepIndex;
          const isCurrent = index === currentStepIndex;

          return (
            <div
              key={step.id}
              onClick={() => onStepClick && isCompleted && onStepClick(index)}
              className={`relative z-10 flex flex-col items-center group ${
                isCompleted && onStepClick ? 'cursor-pointer' : ''
              }`}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold text-xs transition-all duration-200 border-2 ${
                  isCompleted
                    ? 'bg-indigo-800 border-indigo-800 text-white'
                    : isCurrent
                    ? 'bg-white border-indigo-800 text-indigo-900 ring-4 ring-indigo-100 shadow-sm'
                    : 'bg-white border-stone-300 text-stone-400'
                }`}
              >
                {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : index + 1}
              </div>
              <span
                className={`text-xs font-medium mt-2 text-center max-w-[100px] line-clamp-1 ${
                  isCurrent
                    ? 'text-indigo-950 font-semibold'
                    : isCompleted
                    ? 'text-slate-700'
                    : 'text-slate-400'
                }`}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile Stepper Header */}
      <div className="md:hidden flex flex-col space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
          <span>
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className="font-semibold text-indigo-900">
            {steps[currentStepIndex]?.title}
          </span>
        </div>
        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden border border-stone-200/60">
          <div
            className="h-full bg-indigo-800 transition-all duration-300 rounded-full"
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};
