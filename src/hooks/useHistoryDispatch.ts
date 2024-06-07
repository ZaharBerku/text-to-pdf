import { useContext } from "react";

import { HistoryDispatch } from "@context/History/HistoryDispatch";

const useHistoryDispatch = () => {
  return useContext(HistoryDispatch);
};

export { useHistoryDispatch };
