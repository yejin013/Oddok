import React, { useState } from "react";
import Picker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { addDays, subDays } from "date-fns";
import { ArrowLeft, ArrowRight } from "@icons";
import { CalendarHeader } from "@components/commons";
import { dateFormatting } from "@utils";
import CustomInput from "./CustomInput";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/styles/calendar_style.css";
import styles from "./DatePicker.module.css";

function DatePicker({ onChange }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const isMaxDate = dateFormatting(currentDate) >= dateFormatting(new Date());

  const changeDate = (date) => {
    setCurrentDate(date);
    onChange(date);
  };

  return (
    <div className={styles.wrapper}>
      <button type="button" className={styles.button} onClick={() => changeDate(subDays(currentDate, 1))}>
        <ArrowLeft />
      </button>
      <div>
        <Picker
          locale={ko}
          dateFormat="yyyy.MM.dd (E)"
          selected={currentDate}
          onChange={changeDate}
          maxDate={new Date()}
          showPopperArrow={false}
          popperPlacement="bottom"
          customInput={<CustomInput />}
          renderCustomHeader={CalendarHeader}
        />
      </div>
      <button
        type="button"
        className={styles.button}
        onClick={() => {
          if (isMaxDate) return;
          changeDate(addDays(currentDate, 1));
        }}
      >
        <ArrowRight />
      </button>
    </div>
  );
}

export default DatePicker;
