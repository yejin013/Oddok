import React from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { planState, selectedPlanState } from "../../../recoil/plan_state";
import { hourState, minuteState, secondState, startTimeState, endTimeState } from "../../../recoil/timer_state";
import Plans from "../plans/plans";
import styles from "./plan_sidebar.module.css";

function PlanSidebar(props) {
  const [plans, setPlans] = useRecoilState(planState);
  const [selectedPlan, setSelectedplan] = useRecoilState(selectedPlanState);
  const setHour = useSetRecoilState(hourState);
  const setMinute = useSetRecoilState(minuteState);
  const setSecond = useSetRecoilState(secondState);
  const setStartTime = useSetRecoilState(startTimeState);
  const setEndTime = useSetRecoilState(endTimeState);

  const selectPlan = (plan) => {
    setSelectedplan(plan);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setStartTime(null);
    setEndTime(null);
  };

  return (
    <section className={styles.plan_bar}>
      <Plans plans={plans} onPlanClick={selectPlan} />
    </section>
  );
}

export default PlanSidebar;
