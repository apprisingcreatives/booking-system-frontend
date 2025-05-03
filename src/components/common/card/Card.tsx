import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  actions?: ReactNode;
  footer?: ReactNode;
}

const Card = ({ title, children, className, actions, footer }: CardProps) => {
  return (
    <div
      className={clsx(
        "bg-white rounded-md shadow-md p-6 border border-gray-100 w-fit",
        className
      )}
    >
      {(title || actions) && (
        <div className="flex items-center justify-between mb-4">
          {title && (
            <p className="text-lg font-semibold text-gray-800">{title}</p>
          )}
          {actions && <div>{actions}</div>}
        </div>
      )}

      <div className="text-xl font-semibold">{children}</div>

      {footer && <div className="mt-6 pt-4 border-t">{footer}</div>}
    </div>
  );
};

export default Card;
