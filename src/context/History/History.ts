import { HistoryValues } from "@utils/types";

export type StateHistory = {
  [HistoryValues.HISTORY]: any[];
  [HistoryValues.SELECTED_HISTORY]: any;
};

export enum HistoryActionType {
  setHistory,
  setSelectedHistory,
  deleteItemFromHistory,
}

export type HistoryActions =
  | {
      readonly type: HistoryActionType.setHistory;
      readonly payload: any;
    }
  | {
      readonly type: HistoryActionType.setSelectedHistory;
      readonly payload: any;
    }
  | {
      readonly type: HistoryActionType.deleteItemFromHistory;
      readonly payload: number;
    };
