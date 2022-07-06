import React, { useState } from "react";
import Picker from "react-datepicker";
import ko from "date-fns/locale/ko";
import DateInput from "./DateInput";
import CalendarHeader from "./CalendarHeader";
import "react-datepicker/dist/react-datepicker.css";
import "../../../assets/styles/calendar_style.css";

function Calendar({ onChange, defaultDate }) {
  const [currentDate, setCurrentDate] = useState(defaultDate || new Date());

  const changeDate = (date) => {
    setCurrentDate(date);
    onChange(date);
  };

  return (
    <Picker
      locale={ko}
      dateFormat="yyyy. MM. dd"
      selected={currentDate}
      onChange={changeDate}
      minDate={new Date()}
      showPopperArrow={false}
      popperPlacement="bottom"
      customInput={<DateInput />}
      renderCustomHeader={CalendarHeader}
    />
  );
}

export default Calendar;
