import React from "react";
import { Share } from "@icons";
import styles from "./ShareButton.module.css";

function ShareButton() {
  return (
    <div className={styles.share_container}>
      <p>이 페이지를 나가면 공유는 불가능하지만, 마이페이지 &gt; 공부기록 에서 다시 확인할 수 있습니다.</p>
      <button className={styles.share_btn} type="button">
        <Share />
        <span>카카오톡으로 공유</span>
      </button>
    </div>
  );
}

export default ShareButton;
