import React from 'react';
import clsx from 'clsx';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  required,
  className,
  ...props
}) => {
  return (
    <div className={clsx('flex flex-col space-y-1', className)}>
      {label && (
        <label className='text-sm font-medium text-gray-700'>
          {label}
          {required && <span className='text-red-500 ml-0.5'>*</span>}
        </label>
      )}
      <textarea
        {...props}
        className={clsx(
          'rounded-md border px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none',
          error ? 'border-red-500' : 'border-gray-300',
          props.disabled && 'bg-gray-100 cursor-not-allowed'
        )}
      />
      {error ? (
        <p className='text-xs text-red-500'>{error}</p>
      ) : helperText ? (
        <p className='text-xs text-gray-500'>{helperText}</p>
      ) : null}
    </div>
  );
};

export default Textarea;
