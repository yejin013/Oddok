import React, { memo } from "react";
import Plan from "../plan/plan";

function Plans({ plans, onPlanClick }) {
  return (
    <ul>
      {plans.map((plan) => (
        <Plan key={plan.id} plan={plan} onPlanClick={onPlanClick} />
      ))}
    </ul>
  );
}

export default Plans;
