import React, { useCallback } from "react";
import { RadioButton } from "@components/commons";
import { CATEGORY_OPTIONS } from "@utils/constants/options";
import styles from "./CategoryForm.module.css";

function CategoryForm({ category, setCategory }) {
  const onChange = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [setCategory],
  );

  return (
    <>
      <h2 className={styles.heading}>스터디 목표는 무엇인가요?</h2>
      <h3 className={styles.sub_heading}>목표를 설정하면 방을 빠르고 쉽게 설정할 수 있어요.</h3>
      <div className={styles.category}>
        {CATEGORY_OPTIONS.map((item) => (
          <div key={item.value} className={styles.item}>
            <RadioButton
              label={item.label}
              value={item.value}
              group="category"
              onChange={onChange}
              checked={item.value === category}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default CategoryForm;
