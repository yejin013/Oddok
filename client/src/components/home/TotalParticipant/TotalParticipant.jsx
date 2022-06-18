import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "@recoil/user-state";
import { UserCount } from "@components/commons";
import { getTotalParticipant } from "@api/participant-api";
import styles from "./TotalParticipant.module.css";

function TotalParticipant() {
  const user = useRecoilValue(userState);
  const history = useHistory();
  const [totalParticipant, setTotalParticipant] = useState();

  useEffect(() => {
    getTotalParticipant()
      .then((response) => setTotalParticipant(response.data))
      .catch((error) => console.log("get total participant error", error));
  }, []);

  return (
    <div className={styles.participant}>
      <div className={styles.count_box}>
        <div className={styles.count_icon}>
          <UserCount number={totalParticipant} />
        </div>
        <p className={styles.count}>{totalParticipant}명이 ODDOK에서 공부 중이에요</p>
      </div>
      <div className={styles.button_box}>
        {!user.isLogin ? (
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              history.push("/login");
            }}
          >
            ODDOK과 함께 스터디 시작하기
          </button>
        ) : (
          <button
            className={styles.button}
            type="button"
            onClick={() => {
              history.push("/studyroom/create");
            }}
          >
            ODDOK과 함께 스터디 시작하기
          </button>
        )}
      </div>
    </div>
  );
}

export default TotalParticipant;
