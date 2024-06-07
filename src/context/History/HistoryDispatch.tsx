import { createContext } from "react";
import { HistoryItemType } from "@utils/types";

const HistoryDispatch = createContext({
  setHistory: (history: HistoryItemType[]) => {},
  setSelectedHistory: (selectedHistory: HistoryItemType | null) => {},
  deleteItemFromHistory: (id: number) => {},
});

export { HistoryDispatch };
