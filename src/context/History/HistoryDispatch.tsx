import { createContext } from "react";

const HistoryDispatch = createContext({
  setHistory: (history: any) => {},
  setSelectedHistory: (selectedHistory: any) => {},
  deleteItemFromHistory: (id: number) => {}
});

export { HistoryDispatch };
