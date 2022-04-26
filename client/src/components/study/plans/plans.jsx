import React from "react";
import Plan from "../plan/plan";

function Plans({ plans, onPlanClick, onDelete, onEdit, isStudyRoom }) {
  return (
    <ul>
      {plans.map((plan) => (
        <Plan
          key={plan.id}
          plan={plan}
          onPlanClick={onPlanClick}
          onDelete={onDelete}
          onEdit={onEdit}
          isStudyRoom={isStudyRoom}
        />
      ))}
    </ul>
  );
}

export default Plans;
