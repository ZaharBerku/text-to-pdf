import { Dispatch, FC, MouseEvent, useState } from "react";
import clsx from "clsx";
import { HistoryItemType } from "@utils/types";
import { useHistoryState, useHistoryDispatch } from "@hooks/index";
import { ConfirmDelete } from "@components/index";

interface ItemProps {
  name: string;
  isSelect: boolean;
  data: HistoryItemType;
}

interface ListProps {
  list: HistoryItemType[];
  onClose: () => void;
  setLocalHistory: Dispatch<React.SetStateAction<HistoryItemType[] | null>>;
}

const Item: FC<ItemProps> = ({ name, isSelect, data }) => {
  return (
    <li
      data-item={JSON.stringify(data)}
      className={clsx(
        "text-ellipsis overflow-hidden cursor-pointer border w-full rounded-lg m-0 !p-6 flex justify-between items-center border-gray-300 text-white active:border-blue-500 md:hover:border-blue-500",
        {
          "!border-blue-500": isSelect,
        }
      )}
    >
      {name}
      <button data-id={data.id}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#fff"
            d="M7 21c-.55 0-1.02-.196-1.412-.587A1.93 1.93 0 015 19V6H4V4h5V3h6v1h5v2h-1v13c0 .55-.196 1.021-.587 1.413A1.92 1.92 0 0117 21H7zM17 6H7v13h10V6zM9 17h2V8H9v9zm4 0h2V8h-2v9z"
          ></path>
        </svg>
      </button>
    </li>
  );
};

const List: FC<ListProps> = ({ list, onClose, setLocalHistory }) => {
  const { selectedHistory } = useHistoryState();
  const { setSelectedHistory, deleteItemFromHistory } = useHistoryDispatch();
  const [openConfirmDelete, setOpenConfirmDelete] = useState(false);
  const [selectId, setSelectId] = useState<number | null>(null);

  const handleOpenConfirmDelete = () => {
    setOpenConfirmDelete(true);
  };

  const handleCloseConfirmDelete = () => {
    setOpenConfirmDelete(false);
  };

  const deleteGeneratePDF = () => {
    if (selectId) {
      deleteItemFromHistory(selectId);
      setLocalHistory((currentHistory) =>
        currentHistory
          ? currentHistory?.filter((item) => item.id !== selectId)
          : currentHistory
      );
      handleCloseConfirmDelete();
    }
  };

  const handleClick = (event: MouseEvent<HTMLUListElement>) => {
    const element = (event.target as HTMLElement).closest("[data-item]");
    const deleteElement = (event.target as HTMLElement).closest("[data-id]");
    if (deleteElement) {
      const { id } = (deleteElement as HTMLElement).dataset;
      if (id) {
        handleOpenConfirmDelete();
        setSelectId(+id);
      }
    } else if (element) {
      const { item } = (element as HTMLElement).dataset;
      if (item) {
        setSelectedHistory(JSON.parse(item));
        onClose();
      }
    }
  };

  const handleClickReset = () => {
    setSelectedHistory(null);
    onClose();
  };

  return (
    <>
      <ul
        onClick={handleClick}
        className="flex flex-col flex-1 gap-4 w-full px-4 overflow-y-auto h-4/5"
      >
        <li
          onClick={handleClickReset}
          className="text-ellipsis overflow-hidden cursor-pointer border w-full rounded-lg m-0 !p-6 flex justify-start items-center border-gray-300 text-white active:border-blue-500 md:hover:border-blue-500"
        >
          Створити новий файл
        </li>
        {list.map((item) => {
          return (
            <Item
              key={item.id}
              name={item.text}
              isSelect={selectedHistory?.id === item.id}
              data={item}
            />
          );
        })}
      </ul>
      <ConfirmDelete
        open={openConfirmDelete}
        onClose={handleCloseConfirmDelete}
        handleConfirmDelete={deleteGeneratePDF}
      />
    </>
  );
};

export { List };
