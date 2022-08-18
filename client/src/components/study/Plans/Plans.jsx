import React from "react";
import Plan from "./Plan";

function Plans({ plans, onPlanClick, onDelete, onEdit }) {
  return (
    <ul>
      {plans.map((plan) => (
        <Plan //
          key={plan.id}
          plan={plan}
          onPlanClick={onPlanClick}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default Plans;
