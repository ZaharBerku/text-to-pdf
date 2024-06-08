import { FC, PropsWithChildren, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps extends PropsWithChildren {}

const Portal: FC<PortalProps> = ({ children }) => {
  const [container] = useState(() => document.createElement("div"));

  useEffect(() => {
    document.body.appendChild(container);
    return () => {
      document.body.removeChild(container);
    };
  }, [container]);

  return ReactDOM.createPortal(children, container);
};

export { Portal };
