import React from "react";
import styles from "./ErrorPage.module.css";

function ErrorPage() {
  return (
    <div className={styles.container}>
      <div className={styles.title}>알 수 없는 에러 발생😵</div>
      <button
        type="button"
        onClick={() => {
          window.location.reload();
        }}
      >
        새로고침
      </button>
    </div>
  );
}

export default ErrorPage;
