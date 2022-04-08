import React, { useState } from "react";
import NavItem from "./nav_item";

import styles from "./category_nav.module.css";

const items = ["전체", "공무원", "수능/내신", "자격증", "취업", "개인"];

function CategoryNav() {
  const [current, setCurrent] = useState();
  const filterCategoryHandler = (item) => {
    setCurrent(item);
  };
  return (
    <nav className={styles.category_nav}>
      {items.map((item) => (
        <NavItem title={item} onClick={() => filterCategoryHandler(item)} status={current === item ? "active" : ""} />
      ))}
    </nav>
  );
}

export default CategoryNav;
