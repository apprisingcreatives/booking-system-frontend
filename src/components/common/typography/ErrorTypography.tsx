import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  customClasses?: string;
};

const ErrorTypography = ({ children, customClasses = "" }: Props) => {
  return <p className={`text-red-600 ${customClasses}`}>{children}</p>;
};

export default ErrorTypography;
