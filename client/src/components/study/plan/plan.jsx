import React, { useState } from "react";
import styles from "./plan.module.css";
import { ReactComponent as Dots } from "../../../assets/icons/three-dots-vertical.svg";

function Plan({ plan, onPlanClick, onDelete }) {
  const [isClickedBtn, setIsClickedBtn] = useState(false);

  const clickBtn = () => {
    setIsClickedBtn((prev) => !prev);
  };

  const clickDeleteBtn = () => {
    onDelete(plan);
  };

  return (
    <li className={styles.plan}>
      <button type="button" className={styles.name} onClick={() => onPlanClick(plan)}>
        {plan.name}
      </button>
      <ul>
        <li>
          <button type="button" className={styles.dots} onClick={clickBtn}>
            <Dots />
          </button>
        </li>
        {isClickedBtn && (
          <ul className={styles.buttons}>
            <li>
              <button type="button" className={styles.button}>
                수정
              </button>
            </li>
            <li>
              <button type="button" className={styles.button} onClick={clickDeleteBtn}>
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
