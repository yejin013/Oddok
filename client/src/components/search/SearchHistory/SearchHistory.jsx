import React from "react";
import { useSearchHistory } from "@hooks";
import styles from "./SearchHistory.module.css";

function SearchHistory({ searchTitle }) {
  const { history, removeHistory, removeHistoryAll } = useSearchHistory();

  return (
    <div className={styles.wrapper}>
      <div className={styles.head}>
        <h3>검색기록</h3>
        <button type="button" onClick={removeHistoryAll}>
          전체 삭제
        </button>
      </div>
      <div className={styles.content}>
        {history.map((keyword) => (
          <li className={styles.item} key={keyword.key}>
            <span onClick={() => searchTitle(keyword.text)}>{keyword.text}</span>
            <button type="button" onClick={() => removeHistory(keyword.key)}>
              &times;
            </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
