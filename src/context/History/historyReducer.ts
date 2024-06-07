import { HistoryActionType, HistoryActions, StateHistory } from "./History";

const historyReducer = (state: StateHistory, action: HistoryActions) => {
  const { type, payload } = action;
  switch (type) {
    case HistoryActionType.setHistory: {
      return {
        ...state,
        history: payload,
      };
    }
    case HistoryActionType.setSelectedHistory: {
      return {
        ...state,
        selectedHistory: payload,
      };
    }
    case HistoryActionType.deleteItemFromHistory: {
      const newHistoryList = state.history.filter(
        (item) => item.id !== payload
      );
      return {
        ...state,
        history: newHistoryList,
      };
    }
    default:
      return state;
  }
};

export { historyReducer };
