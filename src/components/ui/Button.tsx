import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'emergency';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-600/20 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:transform-none select-none';

    const sizeStyles = {
      sm: 'text-xs px-3 py-1.5 gap-1.5 shadow-xs',
      md: 'text-sm px-4 py-2.5 gap-2 shadow-xs',
      lg: 'text-base px-6 py-3.5 gap-2.5 shadow-sm',
    };

    const variantStyles = {
      primary:
        'bg-indigo-900 hover:bg-indigo-950 text-white border border-indigo-900/50 shadow-sm shadow-indigo-950/10',
      secondary:
        'bg-stone-100 hover:bg-stone-200/80 text-slate-800 border border-stone-200/80',
      outline:
        'bg-white hover:bg-stone-50 text-slate-800 border border-stone-300 shadow-2xs',
      ghost:
        'bg-transparent hover:bg-stone-100 text-slate-700 hover:text-slate-900',
      danger:
        'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200',
      emergency:
        'bg-red-600 hover:bg-red-700 text-white font-semibold shadow-md border border-red-700 animate-pulse-subtle',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          leftIcon
        )}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';
