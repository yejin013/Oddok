import React, { useRef, useState } from "react";
import { Dots, Circle, CheckedCircle } from "@icons";
import { Input } from "@components/commons";
import { useOutSideClick, useInput } from "@hooks";
import styles from "./Plan.module.css";

function Plan({ plan, onPlanClick, onDelete, onEdit, isStudyRoom }) {
  const [isClickedBtn, setIsClickedBtn] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const displayType = isEdited ? styles.hide : "";
  const checkDisplayType = isStudyRoom ? styles.show : styles.hide;
  const inputRef = useRef();
  const dropdownRef = useRef();

  useOutSideClick(dropdownRef, () => setIsClickedBtn(false));
  const { pressEnter } = useInput(inputRef, () => setIsEdited(false));

  // dots button
  const clickBtn = () => {
    setIsClickedBtn((prev) => !prev);
  };

  const clickCheckBtn = async () => {
    const isDone = !plan.isDone;
    onEdit({ ...plan, isDone });
  };

  const clickDeleteBtn = () => {
    onDelete(plan);
  };

  const clickEditBtn = () => {
    setIsEdited((prev) => !prev);
    setIsClickedBtn((prev) => !prev); // edit input 나오면 옵션버튼 자동으로 사라짐
  };

  const changeHandler = (event) => {
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
      {!plan.isDone ? (
        <button type="button" onClick={clickCheckBtn} className={`${styles.check} ${checkDisplayType}`}>
          <Circle />
        </button>
      ) : (
        <button type="button" onClick={clickCheckBtn} className={`${styles.check} ${checkDisplayType}`}>
          <CheckedCircle />
        </button>
      )}
      <span type="button" className={`${styles.name} ${displayType}`} onClick={() => onPlanClick(plan)}>
        {plan.name}
      </span>
      {isEdited && <Input value={plan.name} onChange={changeHandler} onKeyPress={pressEnter} />}
      <ul ref={dropdownRef}>
        <li>
          <button type="button" className={styles.dots} onClick={clickBtn}>
            <Dots />
          </button>
        </li>
        {isClickedBtn && (
          <ul className={styles.buttons}>
            <li>
              <button type="button" className={styles.edit_button} onClick={clickEditBtn}>
                수정
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
