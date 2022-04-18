/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useRef, useState } from "react";
import styles from "./plan.module.css";
import { ReactComponent as Dots } from "../../../assets/icons/three-dots-vertical.svg";
import { ReactComponent as Circle } from "../../../assets/icons/circle.svg";
import { ReactComponent as CheckedCircle } from "../../../assets/icons/check2-circle.svg";
import Input from "../../commons/Input/input";

function Plan({ plan, onPlanClick, onDelete, onEdit, isStudyRoom }) {
  const [isClickedBtn, setIsClickedBtn] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const displayType = isEdited ? styles.hide : "";
  const checkDisplayType = isStudyRoom ? styles.show : styles.hide;
  const formRef = useRef();
  const inputRef = useRef();

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

  const submitHandler = (event) => {
    event.preventDefault();
    setIsEdited((prev) => !prev);
  };

  return (
    <li className={styles.list}>
      {plan.isDone === false ? (
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
      {isEdited && (
        <form ref={formRef} className={styles.form} onSubmit={submitHandler}>
          <Input ref={inputRef} value={plan.name} onChange={changeHandler} />
        </form>
      )}
      <ul>
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
