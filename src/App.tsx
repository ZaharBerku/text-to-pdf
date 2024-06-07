import { HistoryContextProvider } from "@context/index";
import { Home } from "@pages/index";
import "./global.css";

function App() {
  return (
    <HistoryContextProvider>
      <Home />
    </HistoryContextProvider>
  );
}

export default App;
