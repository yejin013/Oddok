import React from "react";
import Plan from "../plan/plan";

function Plans({ plans, onPlanClick, onDelete }) {
  return (
    <ul>
      {plans.map((plan) => (
        <Plan key={plan.id} plan={plan} onPlanClick={onPlanClick} onDelete={onDelete} />
      ))}
    </ul>
  );
}

export default Plans;
