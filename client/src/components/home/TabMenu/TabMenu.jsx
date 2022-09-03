import React, { useState } from "react";
import TabMenuItem from "./TabMenuItem";
import styles from "./TabMenu.module.css";

const items = {
  ALL: "전체",
  OFFICIAL: "공무원",
  SCHOOL: "수능/내신",
  CERTIFICATE: "자격증",
  EMPLOYEE: "취업",
  ETC: "개인",
};

function TabMenu({ setCurrentCategory, defaultValue }) {
  const [current, setCurrent] = useState(defaultValue ?? "ALL");

  const filterCategoryHandler = (key) => {
    setCurrent(key);
    setCurrentCategory(key === "ALL" ? null : key);
  };

  return (
    <nav className={styles.tab_menu}>
      {Object.entries(items).map(([key, value]) => (
        <TabMenuItem key={key} value={value} onClick={() => filterCategoryHandler(key)} status={current === key} />
      ))}
    </nav>
  );
}

export default TabMenu;
