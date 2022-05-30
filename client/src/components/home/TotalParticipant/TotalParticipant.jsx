import React, { useEffect, useState } from "react";
import { UserCount } from "@components/commons";
import { getTotalParticipant } from "@api/participant-api";
import { Plus } from "@icons";
import styles from "./TotalParticipant.module.css";

function TotalParticipant() {
  const [totalParticipant, setTotalParticipant] = useState();
  const isTotalUser = true; // UserCount style위한 변수

  useEffect(() => {
    // 로그인을 안함 or 로그인했는데 북마크가 없음
    getTotalParticipant()
      .then((response) => setTotalParticipant(response.data))
      .catch((error) => console.log("get total participant error", error));
  }, []);

  // 버튼 누르면 로그인 페이지 이동
  return (
    <div className={styles.participant}>
      <div className={styles.count_box}>
        <div className={styles.count_icon}>
          <UserCount number={totalParticipant} />
        </div>
        <p className={styles.count}>{totalParticipant}명이 ODDOK에서 공부 중이에요</p>
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
