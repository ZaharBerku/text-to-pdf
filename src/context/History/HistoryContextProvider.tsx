import React, { FC, PropsWithChildren, useReducer } from "react";

import { HistoryValues } from "@utils/types";

import { HistoryActionType, StateHistory } from "./History";
import { HistoryContext } from "./HistoryContext";
import { HistoryDispatch } from "./HistoryDispatch";
import { historyReducer } from "./historyReducer";

const initialState = {
  [HistoryValues.HISTORY]: [],
  [HistoryValues.SELECTED_HISTORY]: null,
};

interface HistoryContextProviderProps extends PropsWithChildren {}

const HistoryContextProvider: FC<HistoryContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(historyReducer, initialState);
  const context: StateHistory = state;

  const setHistory = (history: any) => {
    dispatch({
      type: HistoryActionType.setHistory,
      payload: history,
    });
  };

  const setSelectedHistory = (selectedHistory: any) => {
    dispatch({
      type: HistoryActionType.setSelectedHistory,
      payload: selectedHistory,
    });
  };

  const deleteItemFromHistory = (id: number) => {
    dispatch({
      type: HistoryActionType.deleteItemFromHistory,
      payload: id,
    });
  };

  return (
    <HistoryContext.Provider value={context}>
      <HistoryDispatch.Provider
        value={{
          setHistory,
          setSelectedHistory,
          deleteItemFromHistory,
        }}
      >
        {children}
      </HistoryDispatch.Provider>
    </HistoryContext.Provider>
  );
};

export { HistoryContextProvider };
