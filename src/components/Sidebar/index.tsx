import { FC } from "react";
import { List } from "@components/index";
import clsx from "clsx";
import { useHistoryState } from "@hooks/index";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar: FC<SidebarProps> = ({ open, onClose }) => {
  const { history } = useHistoryState();
  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed block md:hidden inset-0 bg-black bg-opacity-45"
        ></div>
      )}
      <aside
        className={clsx(
          "max-w-96 fixed bg-primary z-20 -translate-x-full md:translate-x-0 md:static w-full border-r-2 border-gray-400 h-screen",
          {
            "translate-x-0": open,
          }
        )}
      >
        <div className="py-6 relative">
          <h1 className="text-xl text-white font-semibold text-center">
            Конвертувати в <span className="text-blue-500">PDF</span>
          </h1>
          <button
            onClick={onClose}
            className="block w-5 h-5 md:hidden absolute top-4 right-6 before:absolute after:h-px before:h-px after:absolute after:w-full before:w-full after:bg-white before:bg-white after:rotate-45 before:-rotate-45"
          ></button>
        </div>
        {history?.length ? (
          <List list={history} onClose={onClose} />
        ) : (
          <p className="text-white px-5 text-center">
            Ви поки що не згенерували жодного PDF файла
          </p>
        )}
      </aside>
    </>
  );
};

export { Sidebar };
