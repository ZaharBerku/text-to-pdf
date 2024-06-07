import { Layout, Sidebar, MainContent, Header } from "@components/index";
import { useEffect, useState } from "react";
import { useIndexDB, useHistoryDispatch } from "@hooks/index";
import { HistoryItemType } from "@utils/types";

const Home = () => {
  const [localHistory, setLocalHistory] = useIndexDB<HistoryItemType[] | null>(
    "history",
    null
  );
  const { setHistory } = useHistoryDispatch();
  const [open, setOpen] = useState(false);
  const handleOpenSidebar = () => {
    setOpen(true);
  };

  const handleCloseSidebar = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (localHistory) {
      setHistory(localHistory);
    }
  }, [localHistory]);

  return (
    <Layout>
      <Sidebar open={open} onClose={handleCloseSidebar} />
      <div className="w-full">
        <Header handleOpenSidebar={handleOpenSidebar} />
        <MainContent setLocalHistory={setLocalHistory} />
      </div>
    </Layout>
  );
};

export { Home };
