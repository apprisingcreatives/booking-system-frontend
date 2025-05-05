import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import { CircularLoading } from "../display";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  loading?: boolean;
  size?: "sm" | "md" | "lg";
};

const Button = ({
  children,
  className,
  variant = "primary",
  loading = false,
  size = "md",
  ...props
}: ButtonProps) => {
  const baseStyles =
    "rounded-lg font-medium transition duration-200 cursor-pointer  md:w-fit w-full";

  const sizeStyles = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 focus:ring-gray-400",
  };

  return (
    <button
      className={clsx(
        baseStyles,
        sizeStyles[size],
        variants[variant],
        className
      )}
      {...props}
    >
      <div className="flex justify-center items-center gap-x-2">
        {children}
        {loading && <CircularLoading size="sm" colorClassName="" />}
      </div>
    </button>
  );
};

export default Button;
