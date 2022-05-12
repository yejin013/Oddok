import React from "react";
import { useHistory } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

function NotFoundPage() {
  const history = useHistory();
  return (
    <div className={styles.container}>
      <div className={styles.title}>요청하신 페이지를 찾을 수 없습니다.</div>
      <button
        type="button"
        onClick={() => {
          history.push("/");
        }}
      >
        메인으로 돌아가기🏠
      </button>
    </div>
  );
}

export default NotFoundPage;
