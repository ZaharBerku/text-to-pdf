import { HistoryValues, HistoryItemType } from "@utils/types";

export type StateHistory = {
  [HistoryValues.HISTORY]: HistoryItemType[];
  [HistoryValues.SELECTED_HISTORY]: HistoryItemType | null;
};

export enum HistoryActionType {
  setHistory,
  setSelectedHistory,
  deleteItemFromHistory,
}

export type HistoryActions =
  | {
      readonly type: HistoryActionType.setHistory;
      readonly payload: HistoryItemType[];
    }
  | {
      readonly type: HistoryActionType.setSelectedHistory;
      readonly payload: HistoryItemType | null;
    }
  | {
      readonly type: HistoryActionType.deleteItemFromHistory;
      readonly payload: number;
    };
