import React from "react";
import { UserCount } from "@components/commons";
import styles from "./TotalParticipant.module.css";

function TotalParticipant() {
  const isTotalUser = true; // UserCount style위한 변수

  return (
    <div className={styles.participant}>
      <div className={styles.count_box}>
        <UserCount number={198} isTotalUser={isTotalUser} />
        <p className={styles.count}>198명이 ODDOK에서 공부 중이에요</p>
      </div>
      <div className={styles.button_box}>
        <button className={styles.button} type="button">
          ODDOK과 함께 스터디 시작하기
        </button>
      </div>
    </div>
  );
}

export default TotalParticipant;
