import { useState, useEffect } from "react";

const useSearchHistory = () => {
  const [history, setHistory] = useState([]);

  const getHistory = () => (localStorage.getItem("keywords") ? JSON.parse(localStorage.getItem("keywords")) : []);

  const addHistory = (text) => {
    const newItem = { key: new Date(), text };
    const prevHistory = getHistory();
    const updatedHistory = [
      ...prevHistory.filter((e, i) => i > prevHistory.length - 10 && e.text !== newItem.text),
      newItem,
    ];
    localStorage.setItem("keywords", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const removeHistory = (key) => {
    const updatedHistory = getHistory().filter((item) => item.key !== key);
    localStorage.setItem("keywords", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
  };

  const removeHistoryAll = () => {
    localStorage.removeItem("keywords");
    setHistory([]);
  };

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  return { history, getHistory, addHistory, removeHistory, removeHistoryAll };
};

export default useSearchHistory;
