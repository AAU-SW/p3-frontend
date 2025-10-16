import { cn } from '@/lib/utils';
import { forwardRef } from 'react';
import type { ButtonProps } from './Button.types';

const variantClasses = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-gray-500 hover:bg-gray-600 text-white',
  tertiary: 'bg-transparent hover:bg-gray-100 text-blue-500',
};

const sizeClasses = {
  small: 'text-sm py-1 px-2',
  medium: 'text-base py-2 px-4',
  large: 'text-lg py-3 px-6',
};

const disabledClasses = 'opacity-50 cursor-not-allowed';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', children, variant = 'primary', size = 'medium', ...props }, ref) => {
  
    return (
      <button
        ref={ref}
        className={cn(
          variantClasses[variant], 
          sizeClasses[size], 
          { [disabledClasses]: props.disabled }, 
          'p-2 rounded', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
