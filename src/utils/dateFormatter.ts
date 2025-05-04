export type FormatDateProps = {
  date: string | number | Date;
  noDateDisplay?: string | undefined;
  tzCommonName?: string;
};

export const formatDateTime = ({ date }: FormatDateProps) => {
  const newDate = new Date(date);

  if (newDate instanceof Date && !isNaN(newDate.valueOf())) {
    const dateArray = newDate.toDateString().split(" ").slice(1);

    dateArray[1] = `${dateArray[1]},`;

    const dateText = dateArray.join(" ");
    const time = newDate.toLocaleTimeString();
    return `${dateText} - ${time}`;
  }
  return "Invalid date";
};

export const combineDateTime = (date: Date | string, time: string) => {
  if (!date || !time) return "Invalid date or time";

  const formattedDateTime = `${date}T${time}:00.000`;

  return formattedDateTime;
};

export const splitDateTime = (dateTime: string) => {
  if (!dateTime || typeof dateTime !== "string")
    return { date: null, time: null };

  const parsed = new Date(dateTime);
  if (isNaN(parsed.getTime())) return { date: null, time: null };

  const date = parsed.toISOString().split("T")[0];
  const time = parsed.toTimeString().slice(0, 5);

  return { date, time };
};
