import React from "react";
import { Modal, Calendar, Input, Dropdown, Textarea } from "@components/commons";
import styles from "./MyGoalEditModal.module.css";

function MyGoalEditModal() {
  const content = (
    <div className={styles.box}>
      <div className={styles.item}>
        <p>디데이</p>
        <div className={styles.dday}>
          <Calendar />
          <Input />
        </div>
      </div>
      <div className={styles.item}>
        <p>공부시간</p>
        <div>
          <Dropdown
            options={[
              { value: 6, name: "6시간" },
              { value: 7, name: "7시간" },
            ]}
          />
        </div>
      </div>
      <div className={styles.item}>
        <p>목표</p>
        <div>
          <Textarea />
        </div>
      </div>
    </div>
  );
  return <Modal title="목표 수정" content={content} onAction={{ text: "확인" }} />;
}

export default MyGoalEditModal;
