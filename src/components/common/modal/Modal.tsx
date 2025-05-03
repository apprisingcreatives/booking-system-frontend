import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import clsx from "clsx";
import { useMemo } from "react";

type Props = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  toggle: () => void;
  size?: "full" | "";
  maxSize?: "sm" | "xs" | "md" | "lg" | "2xl" | "full";
};

const sizeToMaxWidth = {
  xs: "448px",
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  full: "100%",
};

const Modal = ({
  title,
  children,
  open,
  toggle,
  maxSize = "md",
  size = "",
}: Props) => {
  const maxWidthStyle = useMemo(() => {
    if (size === "full") {
      return "100vw";
    }
    if (maxSize) {
      return sizeToMaxWidth[maxSize];
    }
    return sizeToMaxWidth.sm;
  }, [size, maxSize]);

  const maxHeight = size === "full" ? "100vh" : "calc(100vh - 80px)";

  return (
    <Dialog open={open} onClose={toggle} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-hidden">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <DialogPanel
            style={{ maxWidth: maxWidthStyle, maxHeight }}
            transition
            className={clsx({
              "relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full data-closed:sm:translate-y-0 data-closed:sm:scale-95":
                true,
            })}
          >
            <DialogTitle>
              <p className="text-xl font-semibold p-4 border-b border-b-gray-400">
                {title}
              </p>
            </DialogTitle>
            <div className="bg-white sm:p-6 p-2">
              <div className="flex items-start w-full">
                <div className="text-left w-full">
                  <div className="">{children}</div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
