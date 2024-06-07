import { FC } from "react";

interface HeaderProps {
  handleOpenSidebar: () => void;
}

const Header: FC<HeaderProps> = ({ handleOpenSidebar }) => {
  return (
    <header className="p-5 flex md:hidden w-full items-center border-b border-b-gray-400">
      <button onClick={handleOpenSidebar} className="relative w-5 h-3">
        <span className="w-full flex flex-col justify-between h-px bg-white after:absolute before:absolute before:top-0 after:bottom-0 before:bg-white after:bg-white after:h-px after:w-full before:h-px before:w-full"></span>
      </button>
    </header>
  );
};

export { Header };
