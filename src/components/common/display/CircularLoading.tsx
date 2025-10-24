import clsx from 'clsx';
import { useMemo } from 'react';

type Props = {
  size: 'sm' | 'md' | 'lg' | 'xl';
  otherClasses?: string;
  containerClass?: string;
  colorClassName?: string;
  label?: string;
};
const CircularLoading = ({
  size,
  otherClasses,
  containerClass,
  colorClassName,
  label = '',
}: Props) => {
  const dimensionClass = useMemo(() => {
    if (size === 'sm') {
      return 'h-4 w-4';
    }
    if (size === 'md') {
      return 'h-6 w-6';
    }
    if (size === 'lg') {
      return 'h-10 w-10';
    }
    if (size === 'xl') {
      return 'h-16 w-16';
    }

    return 'h-4 w-4';
  }, [size]);

  const colorClass = colorClassName || 'border-gray-500';

  return (
    <div
      className={`flex gap-x-4 items-center justify-center ${containerClass}`}
    >
      <div
        className={clsx({
          'border-t-2 border-solid rounded-full animate-spin': true,
          [colorClass]: true,
          [dimensionClass]: true,
          [otherClasses || '']: true,
        })}
      />
      <p className='text-gray-500'>{label}</p>
    </div>
  );
};
export default CircularLoading;
