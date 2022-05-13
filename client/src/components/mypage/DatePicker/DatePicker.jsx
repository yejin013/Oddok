import React, { useState } from "react";
import Picker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { ArrowLeft, ArrowRight } from "@icons";
import CustomInput from "./CustomInput";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DatePicker.module.css";

function DatePicker() {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <div className={styles.box}>
      <div className={styles.icon}>
        <ArrowLeft />
      </div>
      <Picker
        locale={ko}
        dateFormat="yyyy/MM/dd"
        selected={startDate} //
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
        showPopperArrow={false}
        popperPlacement="auto"
        customInput={<CustomInput />}
      />
      <div className={styles.icon}>
        <ArrowRight />
      </div>
    </div>
  );
}

export default DatePicker;
