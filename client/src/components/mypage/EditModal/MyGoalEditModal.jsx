import React, { useState } from "react";
import { createProfile, updateProfile } from "@api/mypage-api";
import { Modal, Calendar, Input, Dropdown, Textarea } from "@components/commons";
import { dateParsing, dateFormatting } from "@utils";
import { TARGET_TIME_OPTIONS } from "@utils/constants/options";
import styles from "./MyGoalEditModal.module.css";

function MyGoalEditModal({ profileData, onClose, refetch }) {
  const [inputData, setInputData] = useState(profileData);

  const selectDate = (date) => {
    setInputData((prev) => ({ ...prev, dday: dateFormatting(date) }));
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
    try {
      if (profileData) await updateProfile(inputData);
      else await createProfile(inputData);
    } catch (e) {
      console.error(e);
    }
  };

  const content = (
    <div className={styles.box}>
      <div className={styles.item}>
        <p>디데이</p>
        <div className={styles.dday}>
          <Calendar onChange={selectDate} defaultDate={dateParsing(inputData?.dday)} />
          <Input onChange={inputDdayInfo} value={inputData?.ddayInfo || ""} />
        </div>
      </div>
      <div className={styles.item}>
        <p>공부시간</p>
        <div>
          <Dropdown
            options={TARGET_TIME_OPTIONS}
            onSelect={selectTargetTime}
            defaultValue={inputData?.targetTime && `${inputData.targetTime}시간`}
          />
        </div>
      </div>
      <div className={styles.item}>
        <p>목표</p>
        <div className={styles.textarea}>
          <Textarea onChange={inputGoal} value={inputData?.goal || ""} />
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
          refetch();
        },
      }}
    />
  );
}

export default MyGoalEditModal;
