import { HistoryContextProvider } from "@context/index";
import { Home } from "@pages/index";
import { Helmet } from "react-helmet";
import "./global.css";

function App() {
  return (
    <>
      <Helmet>
        <title>Конвертація тексту в PDF</title>
      </Helmet>
      <HistoryContextProvider>
        <Home />
      </HistoryContextProvider>
    </>
  );
}

export default App;
