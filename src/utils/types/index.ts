export enum HistoryValues {
  SELECTED_HISTORY = "selectedHistory",
  HISTORY = "history",
}

export type HistoryItemType = {
  id: number;
  file: string;
  text: string;
};
