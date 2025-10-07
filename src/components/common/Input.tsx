import React from 'react';
import { clsx } from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  required,
  fullWidth = true,
  className,
  ...props
}) => {
  return (
    <div className={clsx('space-y-1', { 'w-full': fullWidth })}>
      {label && (
        <label
          htmlFor={props.id}
          className='block text-sm font-medium text-gray-700'
        >
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}
      <input
        {...props}
        className={clsx(
          'block w-full rounded-md border-gray-300 shadow-sm border focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 focus:outline-blue-500 disabled:bg-gray-200 disabled:text-gray-600 disabled:border-0',
          {
            'border-red-300 focus:border-red-500 focus:ring-red-500': error,
          },
          className
        )}
      />
      {error && <p className='text-sm text-red-600'>{error}</p>}
      {helperText && !error && (
        <p className='text-sm text-gray-500'>{helperText}</p>
      )}
    </div>
  );
};

export default Input;
