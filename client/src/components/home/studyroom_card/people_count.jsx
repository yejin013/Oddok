import React from "react";
import { ReactComponent as Person } from "../../../assets/icons/person-fill.svg";

import styles from "./people_count.module.css";

// TODO 숫자 받아서 아이콘 개수 조정하기
function PeopleCount({ number }) {
  const people = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < number; i++) {
    people.push(
      <div className={styles.person}>
        <Person />
      </div>,
    );
  }

  return <div className={styles.count}>{people}</div>;
}

export default PeopleCount;
