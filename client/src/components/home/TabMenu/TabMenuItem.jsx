import React from "react";
import styles from "./TabMenuItem.module.css";

function NavItem({ value, onClick, status }) {
  return (
    <div className={`${styles.container} ${status ? styles.active : ""}`} onClick={onClick}>
      {value}
    </div>
  );
}

export default NavItem;
