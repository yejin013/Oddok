import React, { useEffect, useState } from "react";
import { useGoToPage } from "@hooks";
import { UserCount } from "@components/commons";
import { getTotalParticipant } from "@api/participant-api";
import styles from "./TotalParticipant.module.css";

function TotalParticipant() {
  const [totalParticipant, setTotalParticipant] = useState(0);
  const { goToCreate } = useGoToPage();

  useEffect(() => {
    getTotalParticipant()
      .then((response) => setTotalParticipant(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <section className={styles.participant}>
      <div className={styles.count_icon}>
        <UserCount number={totalParticipant} />
      </div>
      <div className={styles.count_box}>
        <span className={styles.text}>{totalParticipant}명이 ODDOK에서 공부 중이에요</span>
        <button className={styles.button} type="button" onClick={goToCreate}>
          ODDOK과 함께 스터디 시작하기
        </button>
      </div>
    </section>
  );
}

export default TotalParticipant;
