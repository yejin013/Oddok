import React from "react";
import { StudyTime } from "@components/mypage";
import styles from "./ShareStudyTime.module.css";

function ShareStudyTime() {
  return (
    <div className={styles.share}>
      <h1>닫기버튼</h1>
      <StudyTime />
      <h1>공유버튼</h1>
    </div>
  );
}

export default ShareStudyTime;
