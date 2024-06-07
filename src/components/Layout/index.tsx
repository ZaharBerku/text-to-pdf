import { FC, PropsWithChildren } from "react";

interface LayoutProps extends PropsWithChildren {}

const Layout: FC<LayoutProps> = ({ children }) => {
  return <div className="flex max-h-screen h-full">{children}</div>;
};

export { Layout };
