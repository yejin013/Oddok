import React, { useState, useEffect } from "react";
import { createProfile, updateProfile } from "@api/mypage-api";
import { Modal, Calendar, Input, Dropdown, Textarea } from "@components/commons";
import styles from "./MyGoalEditModal.module.css";

function MyGoalEditModal({ profileData, onClose, onUpdate }) {
  const [inputData, setInputData] = useState(profileData);

  const selectDate = (date) => {
    setInputData((prev) => ({ ...prev, dday: date.toISOString() }));
  };

  const inputDdayInfo = (e) => {
    setInputData((prev) => ({ ...prev, ddayInfo: e.target.value }));
  };

  const selectTargetTime = (value) => {
    setInputData((prev) => ({ ...prev, targetTime: value }));
  };

  const inputGoal = (e) => {
    setInputData((prev) => ({ ...prev, goal: e.target.value }));
  };

  const edit = async () => {
    console.log(inputData);
    try {
      if (profileData) {
        const response = await updateProfile(inputData);
        onUpdate(response);
        return;
      }
    } catch (e) {
      console.error(e);
    }
    const response = await createProfile(inputData);
    onUpdate(response);
  };

  useEffect(() => {
    console.log(inputData);
  }, []);

  const content = (
    <div className={styles.box}>
      <div className={styles.item}>
        <p>디데이</p>
        <div className={styles.dday}>
          <Calendar onChange={selectDate} defaultDate={inputData && new Date(inputData.dday)} />
          <Input onChange={inputDdayInfo} value={inputData?.ddayInfo} />
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
            onSelect={selectTargetTime}
            defaultValue={inputData && `${inputData.targetTime}시간`}
          />
        </div>
      </div>
      <div className={styles.item}>
        <p>목표</p>
        <div>
          <Textarea onChange={inputGoal} value={inputData?.goal} />
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      title="목표 수정"
      content={content}
      onClose={onClose}
      onAction={{
        text: "확인",
        action: () => {
          edit();
          onClose();
        },
      }}
    />
  );
}

export default MyGoalEditModal;
