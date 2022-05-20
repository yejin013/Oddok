import React from "react";
import { ArrowLeft, ArrowRight } from "@icons";
import styles from "./CustomHeader.module.css";

function CustomHeader({ date, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) {
  return (
    <header className={styles.header}>
      <button type="button" onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <ArrowLeft />
      </button>
      <div>
        <span>{new Intl.DateTimeFormat("ko-KR", { year: "numeric" }).format(date)}</span>
        <span>{new Intl.DateTimeFormat("ko-KR", { month: "long" }).format(date)}</span>
      </div>
      <button type="button" onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <ArrowRight />
      </button>
    </header>
  );
}

export default CustomHeader;
