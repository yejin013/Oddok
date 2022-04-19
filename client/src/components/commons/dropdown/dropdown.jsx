/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from "react";
import { ReactComponent as ArrowDown } from "../../../assets/icons/chevron-down.svg";

import styles from "./dropdown.module.css";

function Dropdown({ options, onSelect, disabled }) {
  const [isActive, setIsActive] = useState(false);
  const [selectedOpt, setSelectedOpt] = useState();

  const toggleMenu = (e) => {
    if (disabled) return;
    setIsActive(!isActive);
  };

  const clickOptionHandler = (name, value) => {
    setSelectedOpt(name);
    onSelect(value);
    setIsActive(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.select} onClick={toggleMenu}>
        <p className={styles.selected_opt}>{selectedOpt || options[0].name}</p>
        <div className={styles.icon}>
          <ArrowDown />
        </div>
      </div>
      <ul className={`${isActive ? styles.active : ""}`}>
        {options.map((option) => (
          <li key={option.value} className={styles.opt} onClick={() => clickOptionHandler(option.name, option.value)}>
            {option.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
