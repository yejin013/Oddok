import React from "react";
import styles from "./TabMenuItem.module.css";

function NavItem({ title, onClick, status }) {
  return (
    <div className={`${styles.container} ${status ? styles.active : ""}`} onClick={onClick}>
      <div>{title}</div>
    </div>
  );
}

export default NavItem;
