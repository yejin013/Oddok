import React from "react";
import styles from "./SideNavBar.module.css";

function SideNavBar() {
  return (
    <div className={styles.side_nav_bar}>
      <ul className={styles.nav_item}>
        <li>내 목표</li>
        <ul className={styles.nav_sub_item}>
          <li>디데이</li>
          <li>공부시간</li>
          <li>목표</li>
        </ul>
        <li>공부 기록</li>
        <li>스터디룸</li>
        <li>계정</li>
      </ul>
    </div>
  );
}

export default SideNavBar;
