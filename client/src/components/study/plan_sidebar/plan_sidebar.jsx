import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { planState, selectedPlanState } from "../../../recoil/plan_state";
import { hourState, minuteState, secondState } from "../../../recoil/timer_state";
import Plans from "../plans/plans";
import styles from "./plan_sidebar.module.css";

function PlanSidebar(props) {
  const [plans, setPlans] = useRecoilState(planState);
  const [selectedPlan, setSelectedplan] = useRecoilState(selectedPlanState);
  const setHourState = useSetRecoilState(hourState);
  const setMinuteState = useSetRecoilState(minuteState);
  const setSecondState = useSetRecoilState(secondState);

  const selectPlan = (plan) => {
    setSelectedplan(plan);
    setHourState(0);
    setMinuteState(0);
    setSecondState(0);
  };

  return (
    <section className={styles.plan_bar}>
      <Plans plans={plans} onPlanClick={selectPlan} />
    </section>
  );
}

export default PlanSidebar;
