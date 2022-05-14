import React, { useState } from "react";
import Picker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { addDays, subDays } from "date-fns";
import { ArrowLeft, ArrowRight } from "@icons";
import CustomInput from "./CustomInput";
import CustomHeader from "./CustomHeader";
import "react-datepicker/dist/react-datepicker.css";
import "./customstyle.css";
import styles from "./DatePicker.module.css";

function DatePicker() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const prevDay = () => {
    setCurrentDate(subDays(currentDate, 1));
  };
  const nextDay = () => {
    setCurrentDate(addDays(currentDate, 1));
  };

  return (
    <div className={styles.box}>
      <button type="button" className={styles.icon} onClick={prevDay}>
        <ArrowLeft />
      </button>
      <div className={styles.date_picker}>
        <Picker
          locale={ko}
          dateFormat="yyyy/MM/dd"
          selected={currentDate}
          onChange={(date) => setCurrentDate(date)}
          minDate={new Date()}
          showPopperArrow={false}
          popperPlacement="auto"
          customInput={<CustomInput />}
          renderCustomHeader={CustomHeader}
          dayClassName={(date) =>
            (addDays(date, 1) < new Date() ? styles.day_disabled : undefined) ||
            (addDays(date, 1) > new Date() && date.getDate() === currentDate.getDate()
              ? styles.day_selected
              : styles.day_default)
          }
        />
      </div>
      <button type="button" className={styles.icon} onClick={nextDay}>
        <ArrowRight />
      </button>
    </div>
  );
}

export default DatePicker;
