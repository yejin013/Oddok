import React, { memo, useRef } from "react";

function Plan({ key, plan, onPlanClick }) {
  return (
    <li>
      <button type="button" onClick={() => onPlanClick(plan)}>
        {plan.name}
      </button>
    </li>
  );
}

export default Plan;
