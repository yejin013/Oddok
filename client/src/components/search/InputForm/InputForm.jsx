import React, { useRef } from "react";
import { Input } from "@components/commons";
import { useSearchParams, useSearchHistory } from "@hooks";
import styles from "./InputForm.module.css";

function InputForm() {
  const titleRef = useRef();
  const { setSearchParams } = useSearchParams();
  const { addHistory } = useSearchHistory();

  const searchTitleHandler = (e) => {
    e.preventDefault();
    addHistory(titleRef.current.value);
    setSearchParams("title", titleRef.current.value, "/search/studyroom");
    titleRef.current.value = "";
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={searchTitleHandler}>
        <Input ref={titleRef} />
      </form>
    </div>
  );
}

export default InputForm;
