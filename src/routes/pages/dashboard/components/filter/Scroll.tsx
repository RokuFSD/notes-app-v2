import React, { ReactNode, memo } from "react";

type ScrollProps = {
  children: ReactNode;
};

function Scroll({ children }: ScrollProps) {
  return <div className="flex gap-2 overflow-auto py-3">{children}</div>;
}

export default memo(Scroll);
