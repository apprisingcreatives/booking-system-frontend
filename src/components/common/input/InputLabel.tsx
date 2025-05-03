import clsx from "clsx";
import { ErrorMessage, Field, useField } from "formik";
import { useState } from "react";

type Props = {
  label: string;
  id: string;
  type?: "password" | "text" | "date" | "email";
  name: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

const InputLabel = ({
  label,
  id,
  type = "text",
  name,
  placeholder = "",
  className = "",
  disabled = false,
}: Props) => {
  const [field] = useField(name);
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className={clsx("gap-y-1 flex flex-col", className)}>
      <label htmlFor={id} className="block font-medium">
        {label}
      </label>
      <Field
        {...field}
        id={id}
        type={inputType}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full p-2 border rounded disabled:bg-gray-200 disabled:text-gray-600 disabled:border-0"
      />
      {isPassword && (
        <label className="mt-1 text-sm flex items-center gap-2">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
          />
          Show password
        </label>
      )}
      <ErrorMessage
        name={name}
        component="div"
        className="text-red-600 text-sm"
      />
    </div>
  );
};

export default InputLabel;
