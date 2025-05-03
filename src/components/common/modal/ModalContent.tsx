import React from "react";

type Props = {
  children: React.ReactNode;
};

const ModalContent = ({ children }: Props) => {
  return <div className="">{children}</div>;
};

export default ModalContent;
