import { createContext } from "react";

import { StateHistory } from "./History";

const HistoryContext = createContext<StateHistory>({} as StateHistory);

export { HistoryContext };
