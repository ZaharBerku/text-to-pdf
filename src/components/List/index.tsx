import { FC, MouseEvent } from "react";
import clsx from "clsx";
import { HistoryItemType } from "@utils/types";
import { useHistoryState, useHistoryDispatch } from "@hooks/index";

interface ItemProps {
  name: string;
  isSelect: boolean;
  data: HistoryItemType;
}

interface ListProps {
  list: HistoryItemType[];
  onClose: () => void;
}

const Item: FC<ItemProps> = ({ name, isSelect, data }) => {
  return (
    <li
      data-item={JSON.stringify(data)}
      className={clsx(
        "text-ellipsis overflow-hidden cursor-pointer border w-full rounded-lg m-0 !p-6 flex justify-start items-center border-gray-300 text-white active:border-blue-500 md:hover:border-blue-500",
        {
          "!border-blue-500": isSelect,
        }
      )}
    >
      {name}
    </li>
  );
};

const List: FC<ListProps> = ({ list, onClose }) => {
  const { selectedHistory } = useHistoryState();
  const { setSelectedHistory } = useHistoryDispatch();

  const handleClick = (event: MouseEvent<HTMLUListElement>) => {
    const element = (event.target as HTMLElement).closest("[data-item]");
    if (element) {
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
  );
};

export { List };
