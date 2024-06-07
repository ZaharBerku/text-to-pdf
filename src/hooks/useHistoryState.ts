import { useContext } from "react";

import { HistoryContext } from "@context/History/HistoryContext";

const useHistoryState = () => {
  return useContext(HistoryContext);
};

export { useHistoryState };
