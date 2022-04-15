import React, { useState } from "react";
import NavItem from "./nav_item";

import styles from "./category_nav.module.css";

const items = [
  { value: undefined, name: "전체" },
  { value: "OFFICIAL", name: "공무원" },
  { value: "SCHOOL", name: "수능/내신" },
  { value: "CERTIFICATE", name: "자격증" },
  { value: "EMPLOYEE", name: "취업" },
  { value: "ETC", name: "개인" },
];

function CategoryNav({ setCategory }) {
  const [current, setCurrent] = useState("전체");
  const filterCategoryHandler = (item) => {
    setCurrent(item.name);
    setCategory(item.value);
  };
  return (
    <nav className={styles.category_nav}>
      {items.map((item) => (
        <NavItem
          title={item.name}
          onClick={() => filterCategoryHandler(item)}
          status={current === item.name ? "active" : ""}
        />
      ))}
    </nav>
  );
}

export default CategoryNav;
