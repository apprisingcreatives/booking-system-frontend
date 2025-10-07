import React from 'react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  steps: Array<{
    title: string;
    description?: string;
  }>;
  currentStep: number;
  className?: string;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  className,
}) => {
  return (
    <div className={clsx('flex items-center justify-center', className)}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <div className='flex flex-col items-center'>
            <div
              className={clsx(
                'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium',
                {
                  'border-blue-600 bg-blue-600 text-white': index < currentStep,
                  'border-blue-600 bg-white text-blue-600':
                    index === currentStep,
                  'border-gray-300 bg-white text-gray-500': index > currentStep,
                }
              )}
            >
              {index < currentStep ? (
                <Check className='h-5 w-5' />
              ) : (
                <span>{index + 1}</span>
              )}
            </div>
            <div className='mt-2 text-center'>
              <div
                className={clsx('text-sm font-medium', {
                  'text-blue-600': index <= currentStep,
                  'text-gray-500': index > currentStep,
                })}
              >
                {step.title}
              </div>
              {step.description && (
                <div className='text-xs text-gray-500'>{step.description}</div>
              )}
            </div>
          </div>
          {index < steps.length - 1 && (
            <div
              className={clsx('mx-4 h-0.5 w-16 flex-1', {
                'bg-blue-600': index < currentStep,
                'bg-gray-300': index >= currentStep,
              })}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StepIndicator;
