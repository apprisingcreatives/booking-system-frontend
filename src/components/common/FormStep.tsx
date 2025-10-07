import React from 'react';
import { clsx } from 'clsx';

interface FormStepProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const FormStep: React.FC<FormStepProps> = ({
  title,
  description,
  children,
  className,
}) => {
  return (
    <div className={clsx('space-y-6', className)}>
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-900'>{title}</h2>
        {description && (
          <p className='mt-2 text-sm text-gray-600'>{description}</p>
        )}
      </div>
      <div className='space-y-4'>{children}</div>
    </div>
  );
};

export default FormStep;
