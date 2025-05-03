type Props = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  paddingClassName?: string;
};

const IconButton = ({
  onClick,
  children,
  className,
  paddingClassName,
}: Props) => {
  const paddingClass = paddingClassName || "p-2";

  return (
    <button
      type="button"
      className={`${paddingClass} rounded-full hover:bg-opacity-20 cursor-pointer ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default IconButton;
