import React from "react";
import styles from "./TabMenuItem.module.css";

function NavItem({ title, onClick, status }) {
  return (
    <div className={`${styles.container} ${status ? styles.active : ""}`} onClick={onClick}>
      {title}
    </div>
  );
}

export default NavItem;
