import React, { useRef } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { planState, selectedPlanState } from "@recoil/plan-state";
import { hourState, minuteState, secondState, startTimeState, endTimeState } from "@recoil/timer-state";
import { Input } from "@components/commons";
import Plans from "../Plans/Plans";
import styles from "./PlanSidebar.module.css";

function PlanSidebar({ isStudyRoom }) {
  const [plans, setPlans] = useRecoilState(planState);
  const [selectedPlan, setSelectedplan] = useRecoilState(selectedPlanState);
  const setHour = useSetRecoilState(hourState);
  const setMinute = useSetRecoilState(minuteState);
  const setSecond = useSetRecoilState(secondState);
  const setStartTime = useSetRecoilState(startTimeState);
  const setEndTime = useSetRecoilState(endTimeState);
  const isPlanBar = true; // UI위한 변수

  const formRef = useRef();
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
    if (selectedPlan.id === plan.id) {
      setSelectedplan({});
    }
  };

  const editPlan = (plan) => {
    const updated = [...plans];
    const index = updated.findIndex((item) => item.id === plan.id);
    if (index !== -1) {
      updated[index] = plan;
    }
    setPlans(updated);
  };

  const submitPlan = (event) => {
    event.preventDefault();
    if (inputRef.current.value === "") {
      return;
    }
    const plan = {
      id: Date.now(),
      name: inputRef.current.value,
      isDone: false,
    };
    formRef.current.reset();
    addPlan(plan);
  };

  return (
    <aside className={styles.plan_bar}>
      <div className={styles.plans}>
        <Plans
          plans={plans}
          onPlanClick={selectPlan}
          onDelete={deletePlan}
          onEdit={editPlan}
          isStudyRoom={isStudyRoom}
        />
      </div>
      <form ref={formRef} className={styles.form} onSubmit={submitPlan}>
        <Input ref={inputRef} isPlanBar={isPlanBar} />
      </form>
    </aside>
  );
}

export default PlanSidebar;
