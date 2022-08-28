import React from "react";
import styles from "./SideNavBar.module.css";

function SideNavBar({ indexRef }) {
  return (
    <ul ref={indexRef} className={styles.side_nav_bar}>
      <li>내 목표</li>
      <ul className={styles.sub}>
        <li>디데이</li>
        <li>공부시간</li>
        <li>목표</li>
      </ul>
      <li>공부 기록</li>
      <li>스터디룸</li>
      <li>계정</li>
    </ul>
  );
}

export default SideNavBar;
