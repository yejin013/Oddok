import React from "react";
import styles from "./plan.module.css";
import { ReactComponent as Dots } from "../../../assets/icons/three-dots-vertical.svg";

function Plan({ plan, onPlanClick }) {
  return (
    <li className={styles.plan}>
      <button type="button" className={styles.name} onClick={() => onPlanClick(plan)}>
        {plan.name}
      </button>
      <button type="button" className={styles.button}>
        <Dots />
      </button>
    </li>
  );
}

export default Plan;
