import React from "react";
import { CloseButton, ShareButton } from "@components/share";
import { StudyTime } from "@components/mypage";
import styles from "./ShareStudyTime.module.css";

function ShareStudyTime() {
  return (
    <div className={styles.share_page}>
      <CloseButton />
      <StudyTime />
      <ShareButton />
    </div>
  );
}

export default ShareStudyTime;
