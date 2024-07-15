import React, { useRef } from "react";
import useIsTextClamped from "../../../hooks/useIsTextClamped";
import { Tooltip } from "./Tooltip";

interface TooltipIfClampedProps {
  children: React.ReactNode;
  content?: React.ReactNode;
  className?: string;
}

const TooltipIfClamped: React.FC<TooltipIfClampedProps> = ({ children, content = null, className }) => {
  const isClampedRef = useRef<HTMLSpanElement>(null);
  const isClamped = useIsTextClamped(isClampedRef);

  const renderContent = () => (
    <span className={className} ref={isClampedRef}>
      {children}
    </span>
  );

  return isClamped ? (
    <Tooltip followMouse={true} content={content || children} renderOpener={({ ref }) => <div ref={ref}>{renderContent()}</div>} />
  ) : (
    renderContent()
  );
};

export default TooltipIfClamped;