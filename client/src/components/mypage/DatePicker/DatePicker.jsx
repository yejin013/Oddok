import React, { useState, useEffect } from "react";
import Picker from "react-datepicker";
import ko from "date-fns/locale/ko";
import { addDays, getDate, subDays } from "date-fns";
import { ArrowLeft, ArrowRight } from "@icons";
import { CalendarHeader } from "@components/commons";
import CustomInput from "./CustomInput";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/styles/calendar_style.css";
import styles from "./DatePicker.module.css";

function DatePicker({ setSelectedDate }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const offset = currentDate.getTimezoneOffset() * 60000;
    setSelectedDate(new Date(currentDate.getTime() - offset).toISOString().slice(0, 10));
  }, [currentDate]);

  return (
    <div className={styles.box}>
      <button type="button" className={styles.move_button} onClick={() => setCurrentDate(subDays(currentDate, 1))}>
        <ArrowLeft />
      </button>
      <div className={styles.date_picker}>
        <Picker
          locale={ko}
          dateFormat="yyyy.MM.dd (E)"
          selected={currentDate}
          onChange={(date) => setCurrentDate(date)}
          maxDate={new Date()}
          showPopperArrow={false}
          popperPlacement="bottom"
          customInput={<CustomInput />}
          renderCustomHeader={CalendarHeader}
          dayClassName={(date) =>
            getDate(date) <= new Date() && getDate(date) === currentDate.getDate() ? "day_selected" : "day_default"
          }
        />
      </div>
      <button type="button" className={styles.move_button} onClick={() => setCurrentDate(addDays(currentDate, 1))}>
        <ArrowRight />
      </button>
    </div>
  );
}

export default DatePicker;
