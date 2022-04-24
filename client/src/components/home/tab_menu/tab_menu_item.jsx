/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { ReactComponent as BookMark } from "../../../assets/icons/bookmark.svg";

import styles from "./tab_menu_item.module.css";

function NavItem({ title, onClick, status }) {
  return (
    <div className={`${styles.container} ${status ? styles.active : ""}`} onClick={onClick}>
      <div className={styles.icon}>
        <BookMark />
      </div>
      <div>{title}</div>
    </div>
  );
}

export default NavItem;
