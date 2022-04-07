import React from "react";
import Header from "../../components/home/header/header";
import styles from "./main_home.module.css";

function MainHome(props) {
  /* 사용자 정보 get */
  /* 사용자별 북마크한 스터디룸 get */
  /* 스터디룸 list get */

  return (
    <div className={styles.home}>
      <Header />
    </div>
  );
}

export default MainHome;
