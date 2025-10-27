import { format } from 'date-fns';

export type FormatDateProps = {
  date: string | number | Date;
  noDateDisplay?: string | undefined;
  tzCommonName?: string;
};

export const formatDateTime = ({ date }: FormatDateProps) => {
  const newDate = new Date(date);

  if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
    const dateArray = newDate.toDateString().split(' ').slice(1);

    dateArray[1] = `${dateArray[1]},`;

    const dateText = dateArray.join(' ');
    const time = newDate.toLocaleTimeString();
    return `${dateText} - ${time}`;
  }
  return 'Invalid date';
};

export const combineDateTime = (date: Date | string, time: string) => {
  if (!date || !time) return 'Invalid date or time';

  const formattedDateTime = `${date}T${time}:00.000`;

  return formattedDateTime;
};

export const splitDateTime = (dateTime: Date | string) => {
  if (!dateTime || typeof dateTime !== 'string')
    return { date: null, time: null };

  const parsed = new Date(dateTime);
  if (isNaN(parsed.getTime())) return { date: null, time: null };

  const date = parsed.toISOString().split('T')[0];
  const time = parsed.toTimeString().slice(0, 5);

  return { date, time };
};

export const formatDate = (date: Date | string) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMMM d, yyyy');
  } catch {
    return 'N/A';
  }
};

export const formatDateTimeFns = (date: Date | string) => {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, 'MMM d, yyyy h:mm a');
  } catch {
    return 'N/A';
  }
};
