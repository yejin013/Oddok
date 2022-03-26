import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { planState, selectedPlanState } from "../../../recoil/plan_state";
import Plans from "../plans/plans";
import styles from "./plan_sidebar.module.css";

function PlanSidebar(props) {
  const [plans, setPlans] = useRecoilState(planState);
  const [selectedPlan, setSelectedplan] = useRecoilState(selectedPlanState);

  const selectPlan = (plan) => {
    setSelectedplan(plan);
  };

  return (
    <section className={styles.plan_bar}>
      <Plans plans={plans} onPlanClick={selectPlan} />
    </section>
  );
}

export default PlanSidebar;
