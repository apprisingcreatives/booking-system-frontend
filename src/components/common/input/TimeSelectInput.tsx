import clsx from 'clsx';
import { FieldHookConfig, useField } from 'formik';

type TimeSelectInputProps = {
  label: string;
  bookedTimes: string[];
  className?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & FieldHookConfig<string>;

const generateTimeSlots = (): string[] => {
  const times: string[] = [];
  const start = 9 * 60; // 9:00 AM
  const end = 17 * 60; // 5:00 PM

  for (let mins = start; mins < end; mins += 30) {
    const hours = String(Math.floor(mins / 60)).padStart(2, '0');
    const minutes = String(mins % 60).padStart(2, '0');
    times.push(`${hours}:${minutes}`);
  }

  return times;
};

const TimeSelectInput = ({
  label,
  bookedTimes,
  className = '',
  onChange,
  ...props
}: TimeSelectInputProps) => {
  const [field, meta, helpers] = useField(props);
  const times = generateTimeSlots();
  const hasError = meta.touched && meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    helpers.setValue(e.target.value); // update Formik value
    if (onChange) {
      onChange(e); // also call custom onChange (e.g. for triggering a request)
    }
  };

  return (
    <div className={clsx('flex flex-col gap-y-1', className)}>
      <label htmlFor={props.id || props.name} className='block font-medium'>
        {label}
      </label>
      <select
        {...field}
        {...props}
        onChange={handleChange}
        className='p-2 border rounded w-full'
      >
        <option value=''>Select Time</option>
        {times.map((time) => (
          <option key={time} value={time} disabled={bookedTimes.includes(time)}>
            {time}
          </option>
        ))}
      </select>
      {hasError && <p className='text-red-600 text-sm'>{meta.error}</p>}
    </div>
  );
};

export default TimeSelectInput;
