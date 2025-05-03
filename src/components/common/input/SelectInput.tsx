import { FieldHookConfig, useField } from "formik";

type Option = {
  value: string;
  label: string;
};

type Props = {
  label: string;
  options: Option[];
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
} & FieldHookConfig<string>;

const SelectInput = ({ label, options, onChange, ...props }: Props) => {
  const [field, meta] = useField(props);
  const hasError = meta.touched && meta.error;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    field.onChange(e);
    onChange?.(e);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        {...field}
        {...props}
        onChange={handleChange}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 ${
          hasError
            ? "border-red-500 focus:ring-red-400"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      >
        <option value="">Select...</option>
        {options.map((opt: Option) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {hasError && <p className="mt-1 text-sm text-red-600">{meta.error}</p>}
    </div>
  );
};

export default SelectInput;
