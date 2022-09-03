import React, { useRef } from "react";
import { Input } from "@components/commons";
import { useSearchParams, useSearchHistory, useInput } from "@hooks";
import styles from "./InputForm.module.css";

function InputForm() {
  const titleRef = useRef();
  const { setSearchParams } = useSearchParams();
  const { addHistory } = useSearchHistory();

  const searchTitleHandler = () => {
    if (titleRef.current.value === "") return;
    addHistory(titleRef.current.value);
    setSearchParams("title", titleRef.current.value, "/search/studyroom");
  };

  const { pressEnter } = useInput(titleRef, () => {
    searchTitleHandler();
    titleRef.current.blur();
  });

  return (
    <div className={styles.wrapper}>
      <Input ref={titleRef} onKeyPress={pressEnter} />
    </div>
  );
}

export default InputForm;
