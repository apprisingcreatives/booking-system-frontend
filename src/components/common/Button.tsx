import React from 'react';
import { clsx } from 'clsx';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  disabled,
  className,
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors';

  const variantClasses = {
    primary:
      'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 disabled:bg-blue-300',
    secondary:
      'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500 disabled:bg-gray-300',
    outline:
      'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-300',
    ghost:
      'text-gray-700 hover:bg-gray-100 focus:ring-gray-500 disabled:text-gray-300',
    danger:
      'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 disabled:bg-red-300',
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };
  console.log(`@@@@@@@@type`, type);
  return (
    <button
      type={type}
      {...props}
      disabled={disabled || loading}
      className={clsx(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        {
          'w-full': fullWidth,
          'cursor-not-allowed opacity-50': disabled || loading,
        },
        className
      )}
    >
      {loading ? (
        <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin' />
          Loading...
        </>
      ) : (
        <>
          {leftIcon && <span className='mr-2'>{leftIcon}</span>}
          {children}
          {rightIcon && <span className='ml-2'>{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
