import React from "react";
import { HashtagButton } from "@components/commons";
import styles from "./HashtagList.module.css";

function HashtagList({ hashtagList, onToggle }) {
  return (
    <div className={styles.hashtag_list}>
      {hashtagList.map((label) => (
        <HashtagButton key={label} label={label} onToggle={onToggle} />
      ))}
    </div>
  );
}

export default HashtagList;
