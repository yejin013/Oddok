import React, { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { planState, selectedPlanState } from "../../../recoil/plan_state";
import { hourState, minuteState, secondState, startTimeState, endTimeState } from "../../../recoil/timer_state";
import Input from "../../commons/Input/input";
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

  const inputRef = useRef();

  const selectPlan = (plan) => {
    setSelectedplan(plan);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setStartTime(null);
    setEndTime(null);
  };

  const addPlan = (plan) => {
    const updated = [...plans, plan];
    setPlans(updated);
  };

  const deletePlan = (plan) => {
    const updated = plans.filter((item) => item.id !== plan.id);
    setPlans(updated);
  };

  const submitPlan = (event) => {
    event.preventDefault();
    const plan = {
      id: Date.now(),
      name: inputRef.current.value,
    };
    inputRef.current.value = "";
    addPlan(plan);
  };

  return (
    <aside className={styles.plan_bar}>
      <div className={styles.plans}>
        <Plans plans={plans} onPlanClick={selectPlan} onDelete={deletePlan} />
      </div>
      <form className={styles.form} onSubmit={submitPlan}>
        <Input ref={inputRef} />
      </form>
    </aside>
  );
}

export default PlanSidebar;
