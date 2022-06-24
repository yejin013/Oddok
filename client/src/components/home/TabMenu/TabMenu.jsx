import React, { useState } from "react";
import TabMenuItem from "./TabMenuItem";
import styles from "./TabMenu.module.css";

const items = [
  { value: undefined, name: "전체" },
  { value: "OFFICIAL", name: "공무원" },
  { value: "SCHOOL", name: "수능/내신" },
  { value: "CERTIFICATE", name: "자격증" },
  { value: "EMPLOYEE", name: "취업" },
  { value: "ETC", name: "개인" },
];

function TabMenu({ setCurrentCategory }) {
  const [current, setCurrent] = useState("전체");

  const filterCategoryHandler = (item) => {
    setCurrent(item.name);
    setCurrentCategory(item.value);
  };

  return (
    <nav className={styles.tab_menu}>
      {items.map((item) => (
        <TabMenuItem
          key={item.name}
          title={item.name}
          onClick={() => filterCategoryHandler(item)}
          status={current === item.name ? "active" : ""}
        />
      ))}
    </nav>
  );
}

export default TabMenu;
