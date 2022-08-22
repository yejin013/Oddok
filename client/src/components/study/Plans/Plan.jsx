import React, { useRef, useState } from "react";
import { Dots, Circle, CheckedCircle } from "@icons";
import { Input } from "@components/commons";
import { useOutSideClick, useInput } from "@hooks";
import styles from "./Plan.module.css";

function Plan({ plan, onPlanClick, onDelete, onEdit }) {
  const { name, isDone } = plan;
  const [isDropdown, setIsDropdown] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef();
  const dropdownRef = useRef();

  useOutSideClick(dropdownRef, () => setIsDropdown(false));
  const { pressEnter } = useInput(inputRef, () => setIsEditing(false));

  const clickDotsBtn = () => {
    setIsDropdown((prev) => !prev);
  };

  const clickCheckBtn = () => {
    onEdit({ ...plan, isDone: !isDone });
  };

  const clickDeleteBtn = () => {
    onDelete(plan);
  };

  const clickEditBtn = () => {
    setIsEditing((prev) => !prev);
    setIsDropdown(false);
  };

  const onChange = (event) => {
    if (event.currentTarget == null) {
      // undifined를 구분하기 위해 == 사용
      return;
    }
    event.preventDefault();
    onEdit({
      ...plan,
      name: event.currentTarget.value,
    });
  };

  return (
    <li className={styles.list}>
      {!isDone ? (
        <button type="button" onClick={clickCheckBtn} className={styles.check}>
          <Circle />
        </button>
      ) : (
        <button type="button" onClick={clickCheckBtn} className={styles.check}>
          <CheckedCircle />
        </button>
      )}
      {!isEditing ? (
        <span type="button" className={styles.name} onClick={() => onPlanClick(plan)}>
          {name}
        </span>
      ) : (
        <Input ref={inputRef} value={name} onChange={onChange} onKeyPress={pressEnter} />
      )}
      <ul ref={dropdownRef}>
        <li>
          <button type="button" className={styles.dots} onClick={clickDotsBtn}>
            <Dots />
          </button>
        </li>
        {isDropdown && (
          <ul className={styles.buttons}>
            <li>
              <button type="button" className={styles.edit_button} onClick={clickEditBtn}>
                {!isEditing ? "수정" : "수정 완료"}
              </button>
            </li>
            <li>
              <button type="button" className={styles.delete_button} onClick={clickDeleteBtn}>
                삭제
              </button>
            </li>
          </ul>
        )}
      </ul>
    </li>
  );
}

export default Plan;
