import React, { useRef } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { planState, selectedPlanState } from "@recoil/plan-state";
import { hourState, minuteState, secondState } from "@recoil/timer-state";
import { Input } from "@components/commons";
import { useInput } from "@hooks";
import { SendButton } from "@icons";
import Plans from "../Plans/Plans";
import styles from "./PlanSidebar.module.css";

function PlanSidebar() {
  const [plans, setPlans] = useRecoilState(planState);
  const [selectedPlan, setSelectedplan] = useRecoilState(selectedPlanState);
  const resetHour = useResetRecoilState(hourState);
  const resetMinute = useResetRecoilState(minuteState);
  const resetSecond = useResetRecoilState(secondState);
  const inputRef = useRef();

  const selectPlan = (plan) => {
    setSelectedplan(plan);
    resetHour();
    resetMinute();
    resetSecond();
  };

  const addPlan = (plan) => {
    const updated = [...plans, plan];
    setPlans(updated);
  };

  const deletePlan = (plan) => {
    const updated = plans.filter((item) => item.id !== plan.id);
    setPlans(updated);
    if (selectedPlan?.id === plan.id) {
      setSelectedplan(null);
    }
  };

  const editPlan = (plan) => {
    const updated = [...plans];
    const index = updated.findIndex((item) => item.id === plan.id);
    updated[index] = plan;
    setPlans(updated);
    if (selectedPlan?.id === plan.id) {
      setSelectedplan(plan);
    }
  };

  const submitPlan = () => {
    if (inputRef.current.value === "") {
      return;
    }
    const plan = {
      id: Date.now(),
      name: inputRef.current.value,
      isDone: false,
    };
    inputRef.current.value = "";
    addPlan(plan);
  };

  const { pressEnter } = useInput(inputRef, submitPlan);

  return (
    <aside className={styles.plan_bar}>
      <div className={styles.plans}>
        <Plans //
          plans={plans}
          onPlanClick={selectPlan}
          onDelete={deletePlan}
          onEdit={editPlan}
        />
      </div>
      <div className={styles.input_container}>
        <Input ref={inputRef} placeholder="목표를 입력하세요" onKeyPress={pressEnter} />
        <button type="submit" className={styles.button} onClick={submitPlan}>
          <SendButton />
        </button>
      </div>
    </aside>
  );
}

export default PlanSidebar;
